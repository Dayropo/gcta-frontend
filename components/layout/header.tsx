import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import axios from "@/api/axios"

type User = {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
}

export default function Header() {
  const router = useRouter()

  const { data, status, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get(`user`)

      return data.data as User
    },
  })

  if (status === "error") {
    console.error(error)
  }

  return (
    <div className="mx-auto flex h-16 w-full items-center justify-between px-8 font-poppins">
      <p>
        <a href="/">Home</a>
      </p>

      <div className="flex items-center gap-2.5">
        {data && <p>{data.name}</p>}
        <Button variant="secondary" onClick={() => router.push("/post/add")}>
          Create new post
        </Button>

        <Button variant="destructive">Sign out</Button>
      </div>
    </div>
  )
}
