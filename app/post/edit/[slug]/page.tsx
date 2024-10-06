import axios from "@/api/axios"
import { getPostBySlug } from "@/api/queries"
import EditPostPage from "@/components/EditPostPage"
import { QueryClient } from "@tanstack/react-query"
import React, { Suspense } from "react"

export async function generateStaticParams() {
  const { data } = await axios.get("posts")

  if (!data.data || data.data.length === 0) {
    return [{ slug: "not-found" }]
  }

  return data.data.map((post: TPost) => ({
    slug: post.slug,
  }))
}

export default async function EditPost({ params }: { params: { slug: string } }) {
  const { slug } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
  })

  return (
    <Suspense>
      <EditPostPage slug={slug} />
    </Suspense>
  )
}
