# precision-medicine-portal — agent notes

## The app lives in `next-app/`

The Next.js app is in `next-app/`, not the repository root, and there is no root
`package.json`. Run every npm/next command from `next-app/`.

## Use Node 26

`next-app/.nvmrc` pins Node 26 and `engines.node` is `>=26`. Run `nvm use` in
`next-app/` first. On an older Node the failures are indirect and easy to
misdiagnose as dependency bugs:

- npm 10 rewrites `package-lock.json` with all 20 `libc` fields stripped — a
  ~60-line diff that is not a dependency change. Undo with
  `git checkout -- next-app/package-lock.json`.
- `next dev` throws `webidl.util.markAsUncloneable is not a function` via
  `src/lib/security-utils.ts` -> isomorphic-dompurify -> jsdom -> undici, which
  reads a `node:worker_threads` symbol that does not exist before Node 22.19.

## Commands (from `next-app/`)

- `npm run lint` - eslint
- `npm run typecheck` - `tsc --noEmit`
- `npm test` - vitest
- `npm run build` - production build
- `npm run format` - prettier

App CI runs install -> lint -> typecheck -> test -> production build -> a
standalone-server smoke test, so run those before pushing. `main` is protected:
land changes through a pull request.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
