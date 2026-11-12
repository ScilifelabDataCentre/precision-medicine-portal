# Security Dependency Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the reported vulnerable dependency versions, including the newer Next.js advisories, while preserving portal and tooling behavior.

**Architecture:** Update supported parent packages and refresh only affected transitive chains. Use a scoped minimatch override only where current ESLint packages cannot resolve a patched release themselves.

**Tech Stack:** Next.js 16, React 19, Node 26, npm 11, TypeScript 6, ESLint, Vitest and Pa11y.

**Spec:** User-approved recommendations and autonomous execution in the current conversation: patch the 13 remaining Dependabot alerts, update Next.js, test, create a signed PR, and merge only if confident.

## Global Constraints

- Keep Node 26, TypeScript 6, the existing framework and current application behavior.
- Preserve the existing sharp and PostCSS security overrides.
- Never dismiss alerts as a substitute for removing affected versions.
- Use a feature branch, signed commits and a reviewed PR.
- Do not publish or deploy a container as part of this dependency change.

## Review Focus

- Sanitizer bundling must work in the standalone server and browser search rendering.
- Next image optimization must return valid AVIF and WebP responses.
- Pa11y CI 5 must accept the existing configuration and all 16 URLs.
- Minimatch 11 must preserve positive, negative, brace, globstar and dotfile matching used by lint tooling.
- The dependency graph must retain platform optional packages and contain no reported vulnerable copies.

### Task 1: Patch and validate dependency chains

**Files:** Modify next-app/package.json and next-app/package-lock.json. No application source changes are expected.

**Interfaces:** Existing npm scripts, Next standalone output, Pa11y JSON configuration and lint glob matching must retain their contracts.

- [x] Establish baseline with npm ci, all tests and npm audit; record vulnerable versions before changing dependencies.
- [x] Reconcile the independent compatibility investigation before editing the manifest.
- [x] Upgrade Next.js and eslint-config-next together to 16.4.6; update Pa11y CI to 5.0.0 and affected compatible transitive dependencies. Scope minimatch 11.0.8 to its current version-10 parents after checking their APIs.
- [x] Confirm the version/range gate changes from failure to pass and npm audit removes the supplied findings. Inspect all lockfile churn and platform metadata.
- [x] Run a clean install, lint, typecheck, all tests and production build. Exercise minimatch compatibility, standalone routes, AVIF/WebP optimization and browser interactions. Run Pa11y on all 16 configured URLs.
- [x] Obtain one independent bypass/regression review of the complete candidate and resolve concrete blockers.
- [x] Prepare the validated change for a signed commit.

## Integration

Push and create the PR with exact validation evidence and scope. Wait for all PR CI checks, recheck the immutable head and review requirements, then merge if safe. Verify main CI and the remaining Dependabot alert state.
