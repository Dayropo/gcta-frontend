import { getAllPosts } from "@/api/queries"
import HomePage from "@/components/HomePage"
import { QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  })

  return (
    <Suspense>
      <HomePage />
    </Suspense>
  )
}
