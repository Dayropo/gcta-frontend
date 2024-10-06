import axios from "@/api/axios"
import PostPage from "@/components/PostPage"
import React from "react"

export async function generateStaticParams() {
  const { data } = await axios.get("posts")

  if (!data.data || data.data.length === 0) {
    return [{ slug: "not-found" }]
  }

  return data.data.map((post: TPost) => ({
    slug: post.slug,
  }))
}

const getPostBySlug = async (slug: string) => {
  const { data } = await axios.get(`posts/${slug}`)

  return data.data as TPost
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  return (
    <div>
      <PostPage post={post} />
    </div>
  )
}
