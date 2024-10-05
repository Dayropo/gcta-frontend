"use client"

import { MinimalTiptapEditor } from "@/components/minimal-tiptap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export default function EditPost() {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-7xl font-poppins">
      <h3 className="text-2xl font-semibold">Create a new post</h3>

      <form className="mt-8 grid gap-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" autoComplete="off" />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="slug">Slug</Label>
          <div className="item-center flex gap-1.5">
            <Input type="text" id="slug" autoComplete="off" />
            <Button type="button" variant="outline">
              Generate
            </Button>
          </div>
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Main image</Label>
          <Input type="file" id="image" accept="image/jpg, image/jpeg, image/png, image/webp" />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Main image</Label>
          <MinimalTiptapEditor immediatelyRender={false} onChange={value => console.log(value)} />
        </div>
      </form>
    </main>
  )
}
