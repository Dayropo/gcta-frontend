"use client"

import React, { useState } from "react"
import Header from "./Header"
import Image from "next/image"
import { Card, CardHeader, CardTitle } from "./ui/card"
import moment from "moment"
import Post from "./Post"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useQuery } from "@tanstack/react-query"
import { CaretDownIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { getAllPosts, getFilteredPosts, getUsers } from "@/api/queries"

const HomePage = () => {
  const router = useRouter()
  const [author, setAuthor] = useState<string>("all")

  const {
    data: posts,
    status: postsStatus,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  })

  if (postsStatus === "error") {
    console.error(postsError)
  }

  const {
    data: authors,
    status: authorsStatus,
    error: authorsError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  if (authorsStatus === "error") {
    console.error(authorsError)
  }

  const { data, status, error } = useQuery({
    queryKey: ["filtered-posts", author],
    queryFn: () => getFilteredPosts(author),
  })

  if (status === "error") {
    console.error(error)
  }

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-5xl font-poppins">
      <Header />

      <main className="w-full px-4 py-12 sm:px-8 lg:px-12">
        {postsStatus === "success" && (
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

            <Card className="absolute bottom-0 left-0 z-10 w-full sm:-bottom-10 sm:left-10 sm:max-w-sm">
              <CardHeader>
                <CardTitle className="text-lg hover:underline sm:text-2xl">
                  {posts[0].title}
                </CardTitle>
                <span className="flex items-center gap-1.5">
                  <p className="text-xs text-gray-400">{posts[0].author.name}</p>
                  <p className="text-xs text-gray-400">
                    {moment(posts[0].publishedAt).format("MMMM DD, YYYY")}
                  </p>
                </span>
              </CardHeader>
            </Card>
          </section>
        )}

        <section className="py-8 sm:mt-10 sm:py-10">
          <h4 className="mb-4 text-base font-semibold sm:text-xl">Latest Posts</h4>

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
            <div className="mt-4 grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
