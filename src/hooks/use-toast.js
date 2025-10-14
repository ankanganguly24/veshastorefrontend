import { toast } from "sonner";

export function useToast() {
  return {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    warning: (message) => toast.warning(message),
    info: (message) => toast.info(message),
    default: (message) => toast(message),
  };
}
