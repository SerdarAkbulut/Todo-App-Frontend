"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/account/useAccount";

function LoginPage() {
  const router = useRouter();
  const { mutate } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Geçersiz email adresi")
        .required("Email zorunludur."),
      password: Yup.string().required("Şifre zorunludur."),
    }),
    onSubmit: (values) => {
      mutate(values, {
        onSuccess() {
          router.push("/");
        },
      });
    },
  });
  return (
    <div className="flex w-full items-center justify-center h-screen ">
      <div>
        <form onSubmit={formik.handleSubmit} className="w-96    p-12">
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div className="flex justify-between">
            <a
              className="bg-red-500 text-white p-2 rounded hover:cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Şifremi Unuttum
            </a>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
