import axios from "@/api/axios"
import { useUserStore } from "@/store/userStore"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const fetchUser = async () => {
  const { data } = await axios.get(`user`)

  return data.data as TUser
}

export function useUserQuery() {
  const setUser = useUserStore(state => state.setUser)

  const query = useQuery<TUser, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
  })

  useEffect(() => {
    if (query.data && !query.error) {
      setUser(query.data)
    }
  }, [query.data, query.error, setUser])

  return query
}
