import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  user: TUser
}

type Actions = {
  setUser: (user: TUser) => void
}

export const useUserStore = create<State & Actions>()(
  persist(
    set => ({
      user: {
        _id: "",
        email: "",
        name: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
      setUser: (user: TUser) => set({ user }),
    }),
    { name: "user" },
  ),
)
