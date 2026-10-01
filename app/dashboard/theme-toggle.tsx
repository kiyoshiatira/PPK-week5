"use client";

import { useRouter } from "next/navigation";

export default function ThemeToggle({ currentTheme }: { currentTheme: string }) {
  const router = useRouter();

  function toggle() {
    const next = currentTheme === "light" ? "dark" : "light";
    document.cookie = `theme=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return <button onClick={toggle}>Tema: {currentTheme}</button>;
}