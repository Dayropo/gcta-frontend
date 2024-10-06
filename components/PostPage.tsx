"use client"

import React from "react"
import Header from "./Header"
import moment from "moment"
import Image from "next/image"
import parse from "html-react-parser"
import { useUserStore } from "@/store/userStore"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useAuthStore } from "@/store/authStore"

const PostPage = ({ post }: { post: TPost }) => {
  const user = useUserStore(state => state.user)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-5xl font-poppins">
      <Header />

      <main className="mx-auto w-full max-w-[640px] space-y-4 py-8">
        <h2 className="text-3xl font-semibold">{post.title}</h2>
        <span className="flex items-center gap-1.5">
          {isLoggedIn && user._id === post.author._id ? (
            <p className="text-xs text-gray-400">You</p>
          ) : (
            <p className="text-xs text-gray-400">{post.author?.name}</p>
          )}
          <p className="text-xs text-gray-400">
            {moment(post.publishedAt).format("MMMM DD, YYYY")}
          </p>
        </span>

        {isLoggedIn && user._id === post.author._id && (
          <div className="flex items-center gap-1.5">
            <Button variant="outline" className="cursor-pointer rounded-lg p-2">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="destructive" className="cursor-pointer rounded-lg p-2">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="relative aspect-video w-full">
          <Image
            src={post.imageUrl}
            alt={post.mainImage}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="body-content">{parse(post.body)}</div>
      </main>
    </div>
  )
}

export default PostPage
