import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstLetters(str: string): string {
  let result = ""
  let isNewWord = true

  for (const char of str) {
    if (isNewWord && char !== " ") {
      result += char
      isNewWord = false
    } else if (char === " ") {
      isNewWord = true
    }
  }

  return result
}
