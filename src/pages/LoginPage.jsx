import { useMutation } from "react-query";
import { useState } from "react";
import { baseUrl } from "../../config";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import toast from "react-hot-toast";

import { ThreeDots } from "react-loader-spinner";

const loginUser = async (userData) => {
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { redirect } = queryString.parse(location.search);

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      // Handle success (e.g., redirect to a different page, show a success message)
      if (data?.user) {
        navigate(redirect || "/");
        toast.success("User Logged in Successfully");
        Cookies.set("user", JSON.stringify(data?.user), {
          expires: 0.041,
        });
      } else {
        setError(data?.message);
      }
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("login error:", error);
    },
  });
  const handleLogin = () => {
    setError("");
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

    const userData = { email, password };
    mutation.mutate(userData);
  };

  return (
    <>
      <div className="w-full bg-gray-200 flex items-center justify-center py-20">
        <div className="w-[90vw] lg:w-[40vw] bg-white p-10 rounded-md border-2 border-black">
          {/* logo */}
          <div className="flex justify-center mb-5">
            <img className="w-40 h-14" src="/logo.png" alt="" />
          </div>
          <div className="flex items-center justify-center">
            <p className="font-bold">Sign in to EasyTech </p>
          </div>

          <div className="mt-5">
            <div className="flex flex-col gap-2 text-sm">
              {/* email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@gmail.com"
                  className="px-5 py-2 outline-none rounded bg-gray-200 focus:border-2 focus:border-primary"
                  type="email"
                  name="email"
                  id=""
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
                  id=""
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
                  id=""
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
                "Log in"
              )}
            </button>
          </div>

          {/* suggest to login */}
          <div className="mt-3">
            <span className="text-[8px] md:text-xs">
              You haven&#x3f;t any account?{" "}
              <p
                onClick={() => navigate("/registration")}
                className="inline cursor-pointer hover:underline hover:text-primary font-bold transition-all duration-300 ease-out"
              >
                Create Account
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
