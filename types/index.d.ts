type TPost = {
  _id: string
  title: string
  slug: string
  author: {
    _id: string
    name: string
  }
  mainImage: string
  imageUrl: string
  body: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  __v: number
}

type TUser = {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
}
