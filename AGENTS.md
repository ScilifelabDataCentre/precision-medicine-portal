# Repository guidance

The application lives in `next-app/`. Read `next-app/AGENTS.md` before working
there, and run npm commands from that directory.

Use Node 26. Run `nvm use` before npm commands; `.nvmrc` files at the repository
root and in `next-app/` select the same version. If nvm is not loaded in the
shell, source its installed `nvm.sh` first. Keep the runtime pins in sync.

For design work, read `next-app/PRODUCT.md` and `next-app/DESIGN.md`. Product
context belongs in PRODUCT.md; brand rules and visual conventions belong in
DESIGN.md. Chat instructions take precedence, then these project conventions,
then the design skills' defaults.

The repository skills are in `.agents/skills/`. Run Impeccable with the app as
its working directory, for example:

```sh
cd next-app
../.agents/skills/impeccable/scripts/impeccable context
```

Keep shared skill files, product/design documents, and brand assets in Git.
Keep downloaded helpers and temporary design-session artifacts out of Git.
Use a feature branch and signed commits; changes to main go through review.
