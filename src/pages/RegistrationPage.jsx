import { useMutation } from "react-query";
import { useState } from "react";
import { baseUrl } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    const userExists = await axios.post(`${baseUrl}/api/user/userExists`, {
      email: userData?.email,
    });

    if (userExists?.data?._id) {
      setError("User Already Exists");
      return;
    }

    const response = await fetch(`${baseUrl}/api/user/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  };

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      // Handle success (e.g., redirect to a different page, show a success message)

      if (data?.message == "user registered") {
        navigate("/");

        toast.success("User Registered Successfully");
      } else {
        setError;
      }
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Registration error:", error);
    },
  });
  const handleLogin = () => {
    setError("");
    if (name == "") {
      setError("name field missing");
      return;
    }
    if (email == "") {
      setError("email field missing");
      return;
    }
    if (password == "") {
      setError("Password field missing");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = { name, email, password };
    mutation.mutate(userData);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center py-10">
        <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white p-10 rounded-md border-2 border-black">
          {/* logo */}
          <div className="flex justify-center mb-5">
            <img className="w-40 h-14" src="/logo.png" alt="" />
          </div>
          <div className="flex items-center justify-center">
            <p className="font-bold">Create a EasyTech Account</p>
          </div>

          <div className="mt-5">
            <div className="flex flex-col gap-2 text-sm">
              {/* fullname */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Fullname</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Alex Guptil"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="text"
                  name="fullname"
                  id="fullname"
                />
              </div>

              {/* email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@gmail.com"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>

              {/* password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

              {/*confirm password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Confirm Password</label>
                <input
                  onChange={(e) => setConfrimPassword(e.target.value)}
                  placeholder="********"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="password"
                  name="password"
                  id="con-password"
                />
              </div>

              <div>
                <p className="text-xs text-red-700 font-bold">{error}</p>
              </div>
            </div>
          </div>

          {/* button */}
          <div className="mt-3 flex justify-center">
            <button
              disabled={mutation.isLoading}
              onClick={handleLogin}
              className="bg-primary hover:bg-purple-900  transition-all duration-500 ease-in px-6 py-1 rounded text-white font-bold border border-black"
            >
              {mutation.isLoading ? (
                <ThreeDots
                  visible={true}
                  height="20"
                  width="40"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Create"
              )}
            </button>
          </div>

          {/* suggest to login */}
          <div className="mt-3">
            <span className="text-[8px] md:text-xs">
              You have an account already?{" "}
              <p
                onClick={() => navigate("/login")}
                className="inline cursor-pointer hover:underline hover:text-primary font-bold transition-all duration-300 ease-out"
              >
                Login
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
