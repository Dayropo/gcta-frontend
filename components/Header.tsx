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
import { LogIn, LogOut, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { getFirstLetters } from "@/lib/utils"

export default function Header() {
  const router = useRouter()
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)
  const { status, error } = useUserQuery()

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
    <>
      <div className="mx-auto hidden h-16 w-full items-center justify-between px-4 font-poppins sm:flex sm:px-8 lg:px-12">
        <a href="/">Home</a>

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

      <div className="mx-auto flex h-16 w-full items-center justify-between bg-foreground px-4 font-poppins text-background sm:hidden sm:px-8 lg:px-12">
        <a href="/">Home</a>

        <div className="flex items-center gap-1.5">
          {isLoggedIn && (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm text-foreground">
              {getFirstLetters(user.name)}
            </span>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="px-2 py-2">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>

            {isLoggedIn ? (
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push("/post/add")}
                >
                  Create new post
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive" onClick={signout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/login")}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/signup")}>
                  Sign up
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}
