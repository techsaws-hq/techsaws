const INTRO_KEY = "page_intro_seen_at";
const ONE_DAY = 1000 * 60 * 60 * 24;

export const introStore = {
    shouldShow(): boolean {
        if (typeof window === "undefined") return false;

        const last = Number(localStorage.getItem(INTRO_KEY));
        if (!last) return true;

        return Date.now() - last > ONE_DAY;
    },

    markSeen(): void {
        if (typeof window === "undefined") return;
        localStorage.setItem(INTRO_KEY, Date.now().toString());
    },
};
