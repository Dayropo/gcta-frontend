import axios from "@/api/axios"
import HomePage from "@/components/HomePage"
import { Suspense } from "react"

export const revalidate = 0

const getAllPosts = async () => {
  const { data } = await axios.get(`posts`)

  return data.data as TPost[]
}

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <Suspense>
      <HomePage posts={posts} />
    </Suspense>
  )
}
