"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRegister } from "../hooks/account/useAccount";
import { useEffect } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const { mutate, isSuccess, isError } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      surName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Ad  en az 3 karakter olmalıdır")
        .required("Ad   zorunludur"),
      surName: Yup.string()
        .min(3, "Soyad  en az 3 karakter olmalıdır")
        .required("Soyad zorunludur"),
      userName: Yup.string()
        .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
        .required("Kullanıcı adı zorunludur"),
      email: Yup.string()
        .email("Geçerli bir e-posta adresi giriniz")
        .required("E-posta zorunludur"),
      password: Yup.string()
        .required("Şifre girmelisiniz")
        .min(6, "En az 6 karakter olmalıdır.")
        .matches(/[A-Z]/, "Şifre en az bir büyük harf (A-Z) içermelidir.")
        .matches(/[a-z]/, "Şifre en az bir küçük harf (a-z) içermelidir.")
        .matches(/\d/, "Şifre en az bir rakam (0-9) içermelidir.")
        .matches(
          /[!@#$%^&*(),.?":{}|<>_\-+=]/,
          "Şifre en az bir özel karakter içermelidir."
        ),
      confirmPassword: Yup.string()
        .required("Şifre tekrar zorunludur")
        .oneOf([Yup.ref("password"), ""], "Şifreler eşleşmiyor"),
    }),
    onSubmit: (values, { setErrors }) => {
      mutate(values, {
        onError: (error: any) => {
          if (error.response?.data) {
            const errorsArray = error.response.data;
            const newErrors: Record<string, string> = {};
            toast.error(
              error.response.data.message || "Kayıt işlemi başarısız oldu."
            );
            errorsArray.forEach(
              (err: { code: string; description: string }) => {
                if (err.code === "PasswordRequiresNonAlphanumeric") {
                  newErrors.password =
                    "Şifre en az bir özel karakter içermelidir.";
                }
                if (err.code === "PasswordRequiresDigit") {
                  newErrors.password = "Şifre en az bir rakam içermelidir.";
                }
                if (err.code === "PasswordRequiresUpper") {
                  newErrors.password =
                    "Şifre en az bir büyük harf içermelidir.";
                }
              }
            );

            setErrors(newErrors);
          }
        },
        onSuccess: () => {
          router.push("/login");
        },
      });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Kayıt başarılı");
    }
    if (isError) {
      toast.error("Kayıt başarısız");
    }
  });
  return (
    <div className="flex  items-center justify-center   ">
      <form onSubmit={formik.handleSubmit} className=" mt-64 p-12">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label>Ad </label>
            <TextField
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label> Soyad</label>
            <TextField
              type="text"
              name="surName"
              onChange={formik.handleChange}
              value={formik.values.surName}
              onBlur={formik.handleBlur}
            />
            {formik.errors.surName && formik.touched.surName && (
              <div className="text-red-500">{formik.errors.surName}</div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <label> Kullanıcı Adı</label>
            <TextField
              type="text"
              name="userName"
              onChange={formik.handleChange}
              value={formik.values.userName}
              onBlur={formik.handleBlur}
            />
            {formik.errors.userName && formik.touched.userName && (
              <div className="text-red-500">{formik.errors.userName}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label>E-posta:</label>
            <TextField
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              variant="outlined"
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <label>Şifre:</label>
            <TextField
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label> Şifre Tekrar:</label>
            <TextField
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>

        <div className="mt-12 flex justify-end w-full">
          <Button type="submit" variant="outlined">
            Kayıt Ol
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
