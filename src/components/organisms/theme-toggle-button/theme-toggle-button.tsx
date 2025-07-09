"use client";

import Moon from "@/components/icons/moon";
import Sun from "@/components/icons/sun";
import ToggleButton from "../../molecules/toggle-button/toggle-button";
import useThemeContext from "@/hooks/use-theme";
import { HTMLAttributes } from "react";

const ThemeToggleButton = ({
    className,
}: {
    className?: HTMLAttributes<HTMLButtonElement>["className"];
}) => {
    const { isDarkMode, setDarkMode } = useThemeContext();

    return (
        <ToggleButton
            onChange={() => setDarkMode(!isDarkMode)}
            isSelected={isDarkMode}
            className={className}
            aria-label="dark/light mode toggle"
        >
            <Sun />
            <Moon />
        </ToggleButton>
    );
};

export default ThemeToggleButton;
