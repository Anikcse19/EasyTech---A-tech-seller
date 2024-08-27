/* eslint-disable react/prop-types */

const Button = ({ children, ...rest }) => {
  // console.log(rest);
  // function rest.goToPayment(){
  //   console.log('cccc')
  // }
  return (
    <div
      className={`${rest.black && "bg-white text-black border border-black"} ${
        rest.fontWhite && "text-black"
      } bg-blue-400 flex items-center justify-center gap-1  px-10 text-center py-2 rounded-sm cursor-pointer ${
        rest.primary ? "text-white" : "text-blue"
      } ${rest.outline ? "border border-blue-900 bg-transparent" : ""}`}
    >
      {children}
    </div>
  );
};

export default Button;
