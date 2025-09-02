import { toast } from "react-toastify";

export const useToast = () => {
  return {
    toast: (options: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      const message = options.title || options.description || "";

      if (options.variant === "destructive") {
        toast.error(message);
      } else {
        toast.success(message);
      }
    },
  };
};
