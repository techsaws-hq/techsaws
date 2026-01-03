import { ThemeEnum } from "@/enums/theme-enum";

export const THEME_COOKIE = "ts-theme";

export function getThemeFromCookie(cookie?: string): ThemeEnum {
    if (!cookie) return ThemeEnum.LIGHT;
    return cookie === ThemeEnum.DARK ? ThemeEnum.DARK : ThemeEnum.LIGHT;
}

export function setThemeCookie(theme: ThemeEnum) {
    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
}
