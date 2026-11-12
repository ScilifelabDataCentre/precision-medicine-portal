# Production 1.3.8 Implementation Plan

> **For agentic workers:** Use the existing release-branch process, then obtain one independent whole-branch review.

**Goal:** Produce a deployable production release containing the dependency and security fixes in 1.3.7, with the NGP page and links excluded.

**Architecture:** Start `release/1.3.8` at `v1.3.7` and reapply the NGP exclusion from commit `0dc3574`, used for production 1.3.6. Keep this release branch separate from `main`, where NGP remains available for development.

**Tech Stack:** Next.js 16.4.6, React 19, Node 26, npm, Vitest, Pa11y and the existing GHCR publishing workflow.

**Spec:** The user's request in this conversation: production must exclude NGP, development uses 1.3.7, and the new production version must include the recent dependency and security fixes.

## Global Constraints

- Preserve the exact dependency graph from `v1.3.7`.
- Remove the NGP route, diagrams, homepage card, data-sources section, desktop and mobile navigation links, footer link and sitemap entry.
- Keep `main` and `v1.3.7` unchanged.
- Synchronize package.json, the root package-lock.json versions and CITATION.cff to 1.3.8.
- Use signed commits and a new immutable release tag; do not change a running environment.

## Review Focus

- Direct requests to the NGP route and its trailing-slash variant must return 404.
- Public HTML, client scripts and sitemap must not advertise or include NGP.
- Removing the fourth homepage card must restore the production three-column layout.
- The lockfile's resolved packages and security overrides must remain identical to 1.3.7.
- The published tag must identify the reviewed release branch, never `main`.

### Task 1: Prepare and validate the production release

**Files:** Reapply the 11-file NGP exclusion from `0dc3574`; update `next-app/package.json`, `next-app/package-lock.json` and `CITATION.cff`. Enable App CI and Pa11y on release-branch pushes. Record verification here.

**Interfaces:** Preserve existing npm scripts, all remaining public routes and the release publishing workflow's tag/version contract.

- [x] Fetch tags, verify the clean starting tree and run the 1.3.7 unit-test baseline (91 tests).
- [x] Reapply the production 1.3.6 exclusion and synchronize release metadata.
- [x] Confirm the dependency graph is unchanged and no NGP references remain in application source.
- [x] Run a clean install, lint, typecheck, tests, formatting and production build.
- [x] Smoke-test every remaining route, NGP 404 responses, sitemap and served assets; run Pa11y and check responsive navigation.
- [x] Obtain independent review with no findings; prepare the verified tree for a signed release commit.
- [ ] Publish the release branch and version tag, confirm the container build and record its immutable image digest.

## Delivery

The production candidate is 1.3.8; development keeps 1.3.7. Publishing the container does not deploy either environment.

## Verification

- Node 26.5.0, npm 11.17.0: clean install, 0 audit vulnerabilities, lint, typecheck, 88 tests and the standard Turbopack production build pass.
- Lint and formatting pass with existing ignored `.impeccable/review/` scratch and `hook.cache.json` excluded. Those untracked local files caused unrelated warnings and a malformed-JSON formatting error in the unrestricted commands.
- An old `.next` cache caused compiler errors and retained NGP development route types. Preserving it outside the app and rebuilding cleanly resolved both failures without source changes.
- All 15 public pages, sitemap and version endpoint return 200 without NGP references. Direct, trailing-slash and query-string NGP requests return 404. All 17 served JavaScript/CSS assets and the new route manifest exclude NGP.
- Pa11y: 15/15 URLs pass with 0 errors. Browser checks at 375, 768 and 1280 px pass, including the three-card layout, no overflow, mobile/desktop navigation, Escape focus restoration and reduced motion.
- Independent review covers the complete source diff and the release CI delta, with no findings. App CI now checks production releases for NGP absence on every configured page and sitemap and for NGP 404 responses.
