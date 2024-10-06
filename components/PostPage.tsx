"use client"

import React, { useState } from "react"
import Header from "./Header"
import moment from "moment"
import Image from "next/image"
import parse from "html-react-parser"
import { useUserStore } from "@/store/userStore"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useAuthStore } from "@/store/authStore"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { getPostBySlug } from "@/api/queries"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "@/api/axios"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const PostPage = ({ slug }: { slug: string }) => {
  const user = useUserStore(state => state.user)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const router = useRouter()
  const queryClient = new QueryClient()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    data: post,
    status,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
  })

  if (status === "error") {
    console.error(error)
  }

  const deletePost = async () => {
    setIsSubmitting(true)
    await axios
      .delete(`posts/${slug}`)
      .then(response => {
        setIsSubmitting(false)
        toast.success(response.data.message)
        queryClient.invalidateQueries({ queryKey: ["posts"], refetchType: "all" })
        queryClient.invalidateQueries({ queryKey: ["filtered-posts"], refetchType: "all" })
        router.push("/")
      })
      .catch(error => {
        setIsSubmitting(false)
        console.error(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        })
      })
  }

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-5xl font-poppins">
      <Header />

      {status === "success" && (
        <main className="mx-auto w-full space-y-4 px-4 py-8 sm:max-w-[500px] sm:px-0 md:max-w-[640px]">
          <h2 className="text-lg font-semibold sm:text-3xl">{post.title}</h2>
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
              <Button
                variant="outline"
                className="cursor-pointer rounded-lg p-2"
                onClick={() => {
                  router.push(`/post/edit/${slug}`)
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button variant="destructive" className="cursor-pointer rounded-lg p-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete this post.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={deletePost}
                      disabled={isSubmitting}
                    >
                      Continue
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

          <div className="body-content text-sm sm:text-base">{parse(post.body)}</div>
        </main>
      )}
    </div>
  )
}

export default PostPage
