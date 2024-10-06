import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import axios from "@/api/axios"
import Swal from "sweetalert2"
import { useUserStore } from "@/store/userStore"
import { useUserQuery } from "@/hooks/useUserQuery"
import { toast } from "react-toastify"
import { useAuthStore } from "@/store/authStore"

export default function Header() {
  const router = useRouter()
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)
  const { data, status, error } = useUserQuery()

  if (status === "error") {
    console.error(error)
  }

  const signout = async () => {
    await axios
      .post(`user/logout`)
      .then(response => {
        toast.success(response.data.message)
        setUser({
          _id: "",
          email: "",
          name: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
        })
        setIsLoggedIn(false)
        router.push("/")
      })
      .catch(err => {
        console.error(err)
        Swal.fire("Error", err.message, "error")
      })
  }

  return (
    <div className="mx-auto flex h-16 w-full items-center justify-between px-8 font-poppins">
      <p>
        <a href="/">Home</a>
      </p>

      <div className="flex items-center gap-2.5">
        {isLoggedIn && <p>{user.name}</p>}

        {isLoggedIn && (
          <Button variant="outline" type="button" onClick={() => router.push("/post/add")}>
            Create new post
          </Button>
        )}

        {isLoggedIn ? (
          <Button variant="destructive" type="button" onClick={signout}>
            Sign out
          </Button>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </div>
  )
}
