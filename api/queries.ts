import axios from "./axios"

export const getAllPosts = async () => {
  const { data } = await axios.get(`posts`)

  return data.data as TPost[]
}

export const getFilteredPosts = async (author: string) => {
  const { data } = await axios.get(`posts?author=${author}`)

  return data.data as TPost[]
}

export const getUsers = async () => {
  const { data } = await axios.get(`user/all`)

  return data.data as TUser[]
}

export const getPostBySlug = async (slug: string) => {
  const { data } = await axios.get(`posts/${slug}`)

  return data.data as TPost
}
