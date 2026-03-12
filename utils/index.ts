export function createPageUrl(pageName: string) {
  // Next.js app routes are defined in lowercase folders (e.g. /dashboard, /tasks)
  // so we normalize the generated URL segment to lowercase.
  return "/" + pageName.replace(/ /g, "-").toLowerCase();
}
