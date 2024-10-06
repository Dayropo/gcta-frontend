import React from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import moment from "moment"
import { useRouter } from "next/navigation"

const Post = ({ item }: { item: TPost }) => {
  const router = useRouter()

  return (
    <Card className="cursor-pointer" onClick={() => router.push(`/${item.slug}`)}>
      <CardHeader className="gap-2.5 p-2.5">
        <div className="relative aspect-video w-full hover:opacity-75">
          <Image
            src={item.imageUrl}
            alt={item.mainImage}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <CardTitle className="hover:underline">{item.title}</CardTitle>
        <span className="flex items-center gap-1.5">
          <p className="text-xs text-gray-400">{item.author.name}</p>
          <p className="text-xs text-gray-400">
            {moment(item.publishedAt).format("MMMM DD, YYYY")}
          </p>
        </span>
      </CardHeader>
    </Card>
  )
}

export default Post
