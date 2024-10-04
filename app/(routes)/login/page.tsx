import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export default function Login() {
  return (
    <main className="relative flex h-screen w-full font-poppins">
      <div className="flex w-1/2 items-center justify-center">
        <div className="grid w-full max-w-lg gap-8">
          <h2 className="text-2xl font-semibold capitalize">Welcome back!</h2>

          <form className="grid gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input type="email" id="email" placeholder="Enter your email" autoComplete="off" />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-500">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center rounded-bl-[32px] rounded-tl-[32px] bg-nature bg-cover bg-center"></div>
    </main>
  )
}
