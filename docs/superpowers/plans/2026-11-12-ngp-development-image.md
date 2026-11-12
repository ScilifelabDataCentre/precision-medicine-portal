# NGP Development Image Implementation Plan

> **For agentic workers:** Execute the user-approved process in this session and obtain one independent whole-branch review before merging.

**Goal:** Clarify regional storage and access control on the NGP page and publish a development image with an exact tag for the Argo CD repository.

**Architecture:** Change the NGP page on a feature branch from `main`. Add a manually triggered, main-only development publisher using the existing Dockerfile and pinned container actions, publishing only `dev-<full-commit-sha>` tags. Keep the version-tag release publisher and production 1.3.8 unchanged.

**Tech Stack:** Next.js 16.4.6, React 19, Node 26, GitHub Actions, Docker Buildx and GHCR.

**Spec:** The user approved the preceding process: edit the supplied clarification, signed commit and PR into main, review and CI, then build a development-only image and provide its exact Argo CD image tag.

## Global Constraints

- Preserve the sentence "The NGP consolidates that storage without consolidating control."
- Follow it with "NGP is a shared national technical infrastructure, but each region has a separate storage environment and controls access to its own data."
- Keep the existing framework, dependencies and package version unchanged.
- Publish only `dev-<full-commit-sha>` from the development workflow, with no stable aliases.
- Preserve signed commits, reviewed PR integration and production 1.3.8.
- Provide the development image tag and digest without editing the external Argo CD repository.

## Review Focus

- The rendered paragraph must retain both the existing sentence and the exact clarification in order.
- Manual runs on a branch other than main must not publish an image.
- Development publishing must never update `latest`, `1`, `1.3` or versioned release tags.
- Both amd64 and arm64 images must identify the exact checked-out commit and retain attestations and image scanning.
- Documentation must distinguish the container image tag from Git tags and Argo CD's Git revision.

### Task 1: Clarify, validate and publish

**Files:** Modify the NGP page and README; create `.github/workflows/publish_development_image.yml` and this plan.

**Interfaces:** Existing Node 26 npm scripts, Dockerfile, GHCR repository, source revision labels and the Argo CD deployment's image tag string.

- [x] Add the approved sentence and update the page's last-updated date.
- [x] Add the manual main-only publisher and document its development image tag and Argo CD usage.
- [x] Validate workflow structure, branch gating, shell syntax and development-only tags; prove the release publisher is unchanged.
- [x] Run clean install, lint, typecheck, tests, production build and standalone NGP render checks.
- [x] Obtain independent review with no findings and prepare the verified tree for a signed PR commit.
- [ ] Wait for all required CI and merge the reviewed PR through normal repository rules.
- [ ] Dispatch the development publisher on main, confirm successful publication and report the exact tag and digest.

## Verification

- Node 26.5.0 / npm 11.17.0: clean install, 0 audit vulnerabilities, lint, typecheck, formatting, 91 tests and the standard production build pass. Existing ignored design scratch is excluded from local lint/format checks, as in the preceding release validation.
- Standalone routes return 200. At 375, 768 and 1280 px, the rendered paragraph contains both exact sentences in order, with no horizontal page overflow. The updated NGP page passes Pa11y with 0 errors.
- Workflow YAML, pinned actions, main-only gate, development-only tag, both image architectures, attestations and shell syntax pass validation. A simulated run summary renders the exact tag and digest correctly.
- Independent whole-branch review reports no findings. The release publisher, package/version files and dependencies are unchanged.
