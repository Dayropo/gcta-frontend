import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  isLoggedIn: boolean
}

type Actions = {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const useAuthStore = create<State & Actions>()(
  persist(
    set => ({
      isLoggedIn: false,
      setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
    }),
    {
      name: "auth-store",
    },
  ),
)
