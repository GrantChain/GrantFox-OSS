/**
 * Curated OSS configuration
 *
 * Configure which organizations (and optionally repos) to display by default.
 */

/**
 * Fixed allowlist in code as requested.
 */
export const CURATED_ORG_LOGINS: string[] = [
  "Trustless-Work",
  "GrantChain",
  "Oppia-Software-Labs",
  "kindfi-org",
  "PACTO-LAT",
  "OFFER-HUB",
  "Crypto-Jaguars",
];

/**
 * Optional explicit repo allowlist (full names like "org/repo").
 * Can be provided from env: NEXT_PUBLIC_CURATED_REPOS="vercel/next.js, open-sauced/app"
 */
export const CURATED_REPO_FULLNAMES: string[] = [];

export interface CuratedOptions {
  orgs?: string[];
}
