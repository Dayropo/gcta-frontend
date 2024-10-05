"use client"

import axios from "@/api/axios"
import { MinimalTiptapEditor } from "@/components/minimal-tiptap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ArrowUpToLine } from "lucide-react"

const DateTimePicker = dynamic(() => import("@/components/time-picker/date-time-picker"), {
  ssr: false,
})

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  image: yup.object().shape({
    filename: yup.string().required("Image filename is required"),
    url: yup.string().required("Image url is required"),
  }),
  body: yup.string().required("Body is required"),
  publishedAt: yup.date().required("Published date is required"),
})

export type CreateFormValues = yup.InferType<typeof validationSchema>

export default function CreatePost() {
  const formik = useFormik<CreateFormValues>({
    initialValues: {
      title: "",
      slug: "",
      image: {
        filename: "",
        url: "",
      },
      body: "",
      publishedAt: new Date(),
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
      // const response = await axios.post(`post/create`, values, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
    },
  })

  const generateSlug = () => {
    const str = formik.values.title
      .toLowerCase()
      .trim()
      .replace(" - ", "-")
      .replace(/\s+/g, "-")
      .replace(/[&\/\\#,;+()$~%'.":*?<>{}]/g, "")
      .replace("--", "-")
    formik.setFieldValue("slug", str)
  }

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-6xl p-12 font-poppins">
      <h3 className="text-2xl font-semibold">Create a new post</h3>

      <form className="mt-8 grid gap-4" onSubmit={formik.handleSubmit}>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            autoComplete="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-xs text-red-500">{formik.errors.title}</p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="slug">Slug</Label>
          <div className="item-center flex gap-1.5">
            <Input
              type="text"
              id="slug"
              autoComplete="off"
              value={formik.values.slug}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Button type="button" variant="outline" onClick={generateSlug}>
              Generate
            </Button>
          </div>
          {formik.touched.slug && formik.errors.slug && (
            <p className="text-xs text-red-500">{formik.errors.slug}</p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Main image</Label>
          {formik.values.image.url ? (
            <div className="">
              <Image src={formik.values.image.url} width={500} height={500} alt="main image" />
            </div>
          ) : (
            <Input
              type="file"
              id="image"
              accept="image/jpg, image/jpeg, image/png, image/webp"
              value={""}
              onChange={async e => {
                if (!e.target.files) return

                const file = e.target.files[0]

                const formData = new FormData()
                formData.append("file", file)

                const response = await axios.post(`file/upload`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })

                if (response && response.status === 200) {
                  const item: { filename: string; url: string } = {
                    filename: response.data.data.filename,
                    url: response.data.data.url,
                  }

                  formik.setFieldValue("image", item)
                }
              }}
            />
          )}
          {formik.touched.image && formik.errors.image && (
            <p className="text-xs text-red-500">{formik.errors.image.filename}</p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Body</Label>
          <MinimalTiptapEditor
            immediatelyRender={false}
            onChange={value => formik.setFieldValue("body", value)}
          />
          {formik.touched.body && formik.errors.body && (
            <p className="text-xs text-red-500">{formik.errors.body}</p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="publishedAt">Published at</Label>
          <DateTimePicker
            date={formik.values.publishedAt}
            setDate={date => formik.setFieldValue("publishedAt", date)}
          />
          {formik.touched.publishedAt && formik.errors.publishedAt && (
            <p className="text-xs text-red-500">
              {typeof formik.errors.publishedAt === "string"
                ? formik.errors.publishedAt
                : "Invalid date"}
            </p>
          )}
        </div>

        <Button className="ml-auto max-w-sm">
          <ArrowUpToLine className="mr-2 h-4 w-4" /> Publish
        </Button>
      </form>
    </main>
  )
}
