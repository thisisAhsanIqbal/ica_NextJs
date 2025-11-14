import { type ClassValue, clsx } from "clsx"

// Fallback implementation of tailwind-merge if package is not installed
// This is a simplified version that handles basic class merging
function twMerge(...inputs: (string | undefined | null | false)[]): string {
  const classString = inputs
    .filter(Boolean)
    .map((input) => (typeof input === 'string' ? input : ''))
    .join(' ')
    .trim()

  if (!classString) return ''

  const classes = classString.split(/\s+/).filter(Boolean)
  
  // Group classes by their base name (handles conflicts like p-4 vs p-2)
  const classMap = new Map<string, string>()
  
  for (const className of classes) {
    // Extract the base class name (e.g., "p-4" -> "p", "bg-red-500" -> "bg")
    // Handle variants like "hover:", "md:", etc.
    const match = className.match(/^(?:[a-z]+:)*([a-z]+(?:-[a-z]+)*)/i)
    if (match) {
      const baseClass = match[1]
      // Keep the last occurrence of conflicting classes
      classMap.set(baseClass, className)
    } else {
      // For classes that don't match the pattern, just add them
      classMap.set(className, className)
    }
  }
  
  return Array.from(classMap.values()).join(' ')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

