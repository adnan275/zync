import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "black",
  setTheme: (theme) => {

    set({ theme: "black" });
  },
}));
