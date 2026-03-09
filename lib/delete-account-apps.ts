/**
 * App slugs that have a dedicated account deletion page (for Play Store requirement).
 * Kept in a separate file so it can be imported by client components (no Node.js "fs" here).
 */
export const deleteAccountAppSlugs: string[] = ["cocktail-app"];

export function hasDeleteAccountPage(appSlug: string): boolean {
  return deleteAccountAppSlugs.includes(appSlug);
}
