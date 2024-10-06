"use client"

import React, { useState } from "react"
import Header from "./Header"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import moment from "moment"
import Post from "./Post"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "@/api/axios"
import { CaretDownIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

const HomePage = ({ posts }: { posts: TPost[] }) => {
  const router = useRouter()
  const [author, setAuthor] = useState<string>("all")

  const {
    data: authors,
    status: authorsStatus,
    error: authorsError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`user/all`)

      return data.data as TUser[]
    },
  })

  if (authorsStatus === "error") {
    console.error(authorsError)
  }

  const { data, status, error } = useQuery({
    queryKey: ["posts", author],
    queryFn: async () => {
      const { data } = await axios.get(`posts?author=${author}`)

      return data.data as TPost[]
    },
  })

  if (status === "error") {
    console.error(error)
  }

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-5xl font-poppins">
      <Header />

      <main className="w-full p-12">
        <section
          className="relative h-96 w-full cursor-pointer"
          onClick={() => router.push(`/${posts[0].slug}`)}
        >
          <Image
            src={posts[0].imageUrl}
            alt={posts[0].mainImage}
            fill
            className="rounded-xl object-cover hover:opacity-75"
          />

          <Card className="absolute -bottom-8 left-8 z-10 max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl hover:underline">{posts[0].title}</CardTitle>
              <span className="flex items-center gap-1.5">
                <p className="text-xs text-gray-400">{posts[0].author.name}</p>
                <p className="text-xs text-gray-400">
                  {moment(posts[0].publishedAt).format("MMMM DD, YYYY")}
                </p>
              </span>
            </CardHeader>
          </Card>
        </section>

        <section className="mt-10 py-10">
          <h4 className="mb-4 text-xl font-semibold">Latest Posts</h4>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 capitalize">
                Authors <CaretDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="bottom" align="start">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={author} onValueChange={setAuthor}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>

                {authorsStatus === "success" &&
                  authors.map(item => (
                    <DropdownMenuRadioItem key={item._id} value={item._id}>
                      {item.name}
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {status === "success" && (
            <div className="mt-4 grid auto-rows-min grid-cols-3 gap-4">
              {data.map(post => (
                <Post item={post} key={post._id} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default HomePage
