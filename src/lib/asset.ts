// The GitHub Pages build is served from /onegrowlearning-next, and next/image does not add
// the basePath to plain string paths, so every file in public/ goes through this helper.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}

/** True for the static GitHub Pages build, where server actions are not available. */
export const isStaticSite = process.env.NEXT_PUBLIC_STATIC_SITE === "1";
