"use client"

import React from "react"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

export default function ToastifyProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" hideProgressBar newestOnTop draggable />
    </>
  )
}
