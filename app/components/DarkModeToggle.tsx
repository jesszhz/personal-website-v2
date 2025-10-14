import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "theme-preference";

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-cheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme)
}

export function DarkModeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [useSystem, setUseSystem] = useState<boolean>(true);

    // On first load use stored theme preference if available, othewise use system theme
    useEffect(() => {
        const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as ThemePreference | null;
        if (stored === "light" || stored === "dark") {
            setTheme(stored)
        } else {
            setTheme(getSystemTheme())
        }
    }, []);

    // If using the system preference as default, add a listener for changes
    useEffect(() => {
        if (!useSystem) return;
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => applyTheme(getSystemTheme());
        mql.addEventListener("change", listener);
        return () => mql.removeEventListener("change", listener);
    }, [useSystem])

    useEffect(() => {
        document.startViewTransition(() => {
            flushSync(() => {
                applyTheme(theme);
            })
        })
    }, [theme])

    function toggleLightDark() {
        const next: ThemePreference = theme === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next)
        setTheme(next)
        setUseSystem(false)
    }

    return (
        <button onClick={toggleLightDark}>
            {theme === "dark" ? "toggle light mode" : "toggle dark mode"}
        </button>
    )
}