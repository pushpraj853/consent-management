import { Toaster } from "react-hot-toast";

const ToasterWrapper = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          color: "#666",
          fontSize: 14,
          letterSpacing: 0.3,
          // add the font-family to be used in the project here
          fontFamily: '"Nunito Sans", sans-serif',
        },
      }}
    />
  );
};

export default ToasterWrapper;
