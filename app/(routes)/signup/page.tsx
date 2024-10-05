"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import axios from "@/api/axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol"),
})

type FormValues = yup.InferType<typeof validationSchema>

export default function Signup() {
  const router = useRouter()

  const formik = useFormik<FormValues>({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      await axios
        .post(`user/register`, values)
        .then(response => {
          toast.success(response.data.message)
          resetForm()
          router.push("/login")
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          })
          console.error(error)
        })
    },
  })

  return (
    <main className="relative flex h-screen w-full font-poppins">
      <div className="flex w-1/2 items-center justify-center">
        <div className="grid w-full max-w-lg gap-8">
          <h2 className="text-2xl font-semibold capitalize">Create an account</h2>

          <form className="grid gap-4" onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                autoComplete="off"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
              Signup
            </Button>

            <p className="text-center text-sm">
              Have an account?{" "}
              <a href="/login" className="text-blue-500">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center rounded-bl-[32px] rounded-tl-[32px] bg-nature bg-cover bg-center"></div>
    </main>
  )
}
