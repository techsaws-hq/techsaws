const INTRO_KEY = "intro_seen_v1";

export const introStore = {
    hasSeen(): boolean {
        if (typeof window === "undefined") return true;
        return localStorage.getItem(INTRO_KEY) === "true";
    },

    markSeen(): void {
        if (typeof window === "undefined") return;
        localStorage.setItem(INTRO_KEY, "true");
    },

    reset(): void {
        if (typeof window === "undefined") return;
        localStorage.removeItem(INTRO_KEY);
    },
};
