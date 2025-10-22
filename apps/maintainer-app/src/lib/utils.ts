import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  }
}

export function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    web: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    mobile: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    backend:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    devops:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    ai: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  };
  return (
    colors[category?.toLowerCase()] ||
    "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
  );
}
