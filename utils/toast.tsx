import toast, { Toaster } from "react-hot-toast";

export const AppToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 1500,
      style: {
        borderRadius: "10px",
        fontSize: "14px",
      },
      success: {
        duration: 2000,
        style: {
          background: "#2a9d8f",
          color: "#fff",
          fontSize: "12px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#2a9d8f",
        },
      },
      error: {
        style: {
          borderWidth: "2px",
          borderColor: "#e7000b",
          color: "#e7000b",
        },
        iconTheme: {
          primary: "#e7000b",
          secondary: "#fff",
        },
      },
    }}
  />
);

export { toast };
