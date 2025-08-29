import { toast } from "react-toastify";
import request from "@/app/api/request";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: (values: any) => request.Account.register(values),
    onSuccess: () => {
      toast.success("Kayıt Başarılı");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Kayıt başarısız");
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: (values: any) => request.Account.login(values),
    onSuccess: (data) => {
      toast.success("Giriş Başarılı");
      localStorage.setItem("token", data?.token);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Giriş başarısız");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (values: any) => request.Account.forgotPassword(values),
    onSuccess: () => {
      toast.success("Email Gönderildi");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Email gönderilemedi");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (values: any) => request.Account.resetPassword(values),
    onSuccess: () => {
      toast.success("Şifre Sıfırlama Başarılı");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Şifre sıfırlama başarısız"
      );
    },
  });
};
