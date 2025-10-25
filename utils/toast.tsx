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
        style: {
          background: "#b25487",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#b25487",
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
