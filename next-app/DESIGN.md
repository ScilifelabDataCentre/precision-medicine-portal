# DESIGN.md: Precision Medicine Portal v2

This file holds the portal's design conventions. Read it before any UI work. Where a design skill's defaults conflict with it, follow this file. Direct instructions from the person you're working with still come first. Brand rules in it are fixed; everything else changes only through a reviewed pull request.

Precision Medicine Portal v2 carries SciLifeLab's brand exactly: four colours and their tints, Lato and Lora, the logotype. On top sits a quiet, product-first restraint in the spirit of Apple's design: generous space, one accent, strict type, depth from surfaces, one translucent material and motion that answers instantly and can always be reversed. The data is the product; the design gets out of its way. Every screen also passes the accessibility floor and the craft rules below. The portal is a public service under the Swedish Act on Accessibility to Digital Public Services (DOS-lagen), so WCAG 2.1 AA is the minimum, not the goal.

## How to work on UI in this repo

- Read this file and `AGENTS.md` first. The app lives in `next-app/`.
- Build with the tokens below through Tailwind utilities (`bg-surface-alt`, `text-ink-muted`, `text-title-2`, `rounded-pill`), never raw hex values or arbitrary pixel sizes.
- Before you commit to a layout for a new page or substantial redesign, offer at least three distinct options side by side as described in `AGENTS.md`; build the chosen one.
- Check your own render in the browser at 375px, 768px and 1280px wide, by keyboard and with reduced motion on.
- Before opening a pull request: run a design critique and polish pass, audit the changed files against web interface guidelines, then `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`. pa11y in CI is the final gate.

## Rules

### Content fundamentals

- Write for researchers who are short on time. Lead with what they can do: "Browse registries", "Apply for access".
- Name things the way researchers do, not the way the system is built: "Swedish research cohorts", not "cohort entities".
- Prefer specific labels to safe generic ones: "Quality registries", not "Resources"; "Apply for access", not "Get started".
- Use sentence case everywhere: headings, buttons, navigation. No ALL-CAPS labels.
- Address the reader as "you" and the team as "we". Active voice, plain verbs.
- A button says exactly what happens and keeps the same verb through a flow. Never "Submit" or "Click here".
- No exclamation marks, no emoji, no hype words like "revolutionary" or "cutting-edge". State facts and let the data speak.
- Pick one spelling standard per page. Current copy mixes "individualised" and "harmonize".
- Write an acronym out on its first use on each page: "the OMOP Common Data Model (OMOP CDM)".
- Model copy: "The entry point to research data for precision medicine in Sweden" says what the site is. "Explore various Swedish registries offering individualised health data" says what you will find.

### Brand rules (fixed)

Nothing below overrides these.

- **One brand.** SciLifeLab is one brand, so the portal never gets a logo of its own: no lockup images, no product marks, no icon standing in for a logo. The site name is live text in Lato beside the logotype, outside its clear space.
- **Colour.** Use only `lime`, `teal`, `aqua` and `grape`, their 25, 50 and 75% tints, white, black and grays between 5% and 90% black. The one exception is `danger`, for errors.
- `lime` is the main brand colour. Give it the big moments (a highlight band, an illustration, the hero's accent shape), not small UI details.
- `grape` is a colour pop: one detail per view at most.
- **Type.** Lato (`sans`) for headlines and interface, Lora (`serif`) for reading text, nothing else. `mono` is only for code and OMOP identifiers. Where Lora lacks a character (Greek letters, maths symbols), the `serif` stack falls back to Times New Roman.
- **Logotype.** The website always shows the full SciLifeLab logotype, never the symbol alone. Use the green-symbol versions wherever they read: `scilifelab-logotype-pos.png` on light surfaces, `scilifelab-logotype-neg.png` on `teal` and `grape`. Use `scilifelab-logotype-black.png` or `scilifelab-logotype-white.png` only where the green symbol would vanish, such as on `lime` or over a photo.
- Keep clear space on every side at least the size of the logotype's lowercase a, about 0.4 × the logo's height: at the header's 1.75rem, `space-16` is enough. Never show it narrower than 76px (the manual's 20mm on screen). Never recolour, stretch, crop or add effects.
- **Symbol.** The symbol alone is only for square formats: `scilifelab-symbol-square-lime.png` for the favicon and app icons, the green or black square versions for avatars. Prefer green; use black or white only where green doesn't read.
- **Photos.** Photos over illustrations: genuine SciLifeLab environments and people at work, not stock. Use an illustration only when a photo can't carry the message.

### Visual foundations

#### Space and layout

- Whitespace is the pedestal. Pad sections with `space-96` on wide screens and `space-64` on phones; give the hero `space-128`.
- Lock content at `content-max` with a `space-24` gutter (`space-16` on phones). Keep `body` and `lead` text within `measure`.
- One idea per section. If a section needs a border to hold together, give it more space instead.
- Separate sections by alternating `surface` and `surface-alt`. Use `lime-25` for the one section that must be noticed, and a `teal` band for the hero or one call to action, besides the footer.
- Sizes are in rem and breakpoints in em, so the whole layout grows with the reader's font-size setting.

#### Colour in use

- `teal` is the only interactive colour: links, primary buttons, focus and the current nav item. No other text on the page is teal, so teal always means "you can act here".
- Text on `lime` is always `on-lime`. White on lime fails at 1.9:1.
- `aqua` never carries text under 24px (3.4:1). Use it in charts, illustrations and large type.
- Chart series run `teal`, `lime`, `aqua`, `grape`, then the 50% tints. Label series directly; never rely on colour alone.
- Errors use `danger` on `danger-soft` with an icon and the word "Error". Confirmations use `success` on `success-soft` with an icon and a word.

#### Type

- Two weights only, 400 and 700. Lato on Google Fonts has no 500 or 600, so never fake them.
- Build hierarchy from size, weight and leading together, never colour: `display` once per page, then `title-1`, `title-2`, `title-3` and `headline`.
- Tracking changes with size: the big styles are tight (built in), body text sits at 0 and `caption` opens slightly. Never set one letter-spacing for everything.
- Leading runs the other way: tight on headlines, loose on `body` and `lead`.
- Open a page with one `lead`. Set long text in `body` within `measure`. UI text is `ui`, buttons and labels are `label`, metadata is `caption`, and nothing is smaller than `caption`.
- Emphasise with Lora italic in reading text and with bold in UI. Underline only means link.

#### Depth, materials and lines

- No drop shadows on cards, buttons or text. There are two shadows: `shadow-media` lifts product imagery such as a dashboard screenshot, and `shadow-float` lifts layers that float over the page, meaning dropdown menus and the mobile menu panel.
- Create depth with surfaces: a `surface-alt` card on `surface`, a `surface` card on `surface-alt`, `lime-25` on hover.
- One material: `header-material`, with a 20px backdrop blur, behind the sticky header and behind dropdown menus, so the page stays in view underneath. It turns solid `surface` under reduced transparency, higher contrast or without backdrop-filter support.
- Text on the material is `ink` or `teal` only, at `ui` size or larger: never `ink-muted` or `caption`, because the background shifts with whatever is underneath. Over the darkest possible background, `ink` keeps 12.3:1 and `teal` 5.5:1.
- Dim to focus, separate to keep flow. A modal layer (the mobile menu panel, any dialog) is solid `surface` with `shadow-float` over a `scrim` that dims the page and takes it out of interaction. A non-modal layer (a dropdown menu) uses the material and `shadow-float` without a scrim, so the page stays in context.
- Nothing else is translucent: no glass cards, buttons or panels, and no content on a translucent layer that sits on another translucent layer. The scrim only ever sits under a solid panel.
- Separate rows and sections with 1px `line` hairlines; outline controls with `line-strong`. No heavy borders, no coloured left-border accents, no gradients.
- Every floating layer also keeps a 1px `line` border, because shadows disappear in forced-colours mode. Under `prefers-contrast: more`, that border becomes `line-strong` and the shadow is dropped.
- Actions are pills (`radius-pill`), cards and menus `radius-md`, media `radius-lg`, inputs and tags `radius-sm`.

#### Imagery

- One strong image beats three decorative ones. Crop it tight, round it with `radius-lg` and let it sit on `surface`.
- Screenshots of real dashboards and data tools are the product shots here: show them large, with `shadow-media`.
- Alt text says what the image shows and why it is there. Decorative images get an empty alt.

#### Motion

- Respond on press, not on release. Buttons and the menu button scale to 0.97 and cards to 0.99 the moment they are pressed (100ms).
- Every transition can be interrupted and reversed. Use CSS transitions, which pick up from wherever the element is, never keyframes for anything a person can toggle. A second tap on "Menu" reverses the panel mid-way.
- Things leave the way they came and grow out of what opened them: the menu panel drops from the header and returns into it.
- Keep interface motion under 300ms: 100ms for a press, 160ms for colour, 200ms for a panel, all ease-out.
- If motion ever needs JavaScript (a draggable sheet, a carousel), use critically damped springs with no bounce. Bounce only after a flick, which this portal doesn't have.
- Animate only opacity, colour and transform. Nothing moves on its own: no scroll-triggered fades, no parallax, no looping motion.
- Under `prefers-reduced-motion`, movement becomes a short cross-fade; colour changes stay because they help understanding.

### Interaction

- Every page answers three questions. Where am I: the current nav item in `teal` and a page title that matches its nav label, plus breadcrumbs from two levels deep. Where can I go: one clear next step per section. How do I get back: the logotype always links home.
- Feedback comes in four kinds: status, completion, warning and error. Validate a form field when the person leaves it, not on submit, and confirm a sent message in words.
- Keep the input path free of delays: no artificial waits or spinners for local actions; debounce only search.
- Ask for confirmation only before something destructive and irreversible. Everywhere else, make undo easy.

### Accessibility

- Text holds at least 4.5:1, or 3:1 at 24px and above (19px bold). Control borders, focus rings and meaningful icons hold at least 3:1. Each colour token's note lists the surfaces where it passes.
- Every interactive element shows a focus ring: a solid 2px `focus` outline with a 2px offset on light surfaces, `focus-inverse` on `teal` and `grape`.
- Targets are at least `target-min` tall. Dense footer links are at least 24px.
- Use real elements: `button` for actions, `a` for navigation, one `h1` per page, headings in order, a visible label on every field, `lang` on the page and on Swedish passages.
- `Escape` closes the menu panel and returns focus to the menu button.
- Never convey meaning by colour alone: status gets an icon and a word, and links in running text are underlined.
- Give every image a width and height so nothing jumps while it loads, and every chart a text summary or a data table.
- Format numbers and dates for the page's language with `Intl`.
- Before merging, run pa11y and tab through the page once with the keyboard.

### Craft rules

Check these before anything ships.

- Spend boldness in one place: one hero, one `teal` band and one primary button per view. Everything else stays quiet.
- Don't set one word of a headline in another colour or weight to accent it.
- No ALL-CAPS labels above headings, no numbered markers (01, 02) unless the content is a real sequence, no "→" on links or buttons.
- Don't chop a page into identical cards by reflex. Use `Card` only for things people choose between.
- No filler stats. Show a number only if it is real and current, like the actual count of registries.
- No emoji and no decorative icons beside headings.
- Try every interaction in the browser and watch motion in slow motion before shipping; what looks fine in a still often feels wrong in use.
- Before shipping, remove one thing. If an element doesn't help someone find or use data, it goes.

### Iconography

- Icons come from Lucide, the set the portal already ships as `lucide-react`: 20px beside text, 24px on their own, 2px stroke, drawn in `currentColor`.
- An icon supports a label, it doesn't replace one. An icon-only control needs an `aria-label`.
- No emoji and no illustrated icon sets.

## Tokens

The theme file `next-app/src/app/pmp-theme.css`, imported from `globals.css`, defines all of these for Tailwind v4: colours as `--color-<token>`, type as `--text-<style>` with line height, tracking and weight, radii as `--radius-<token>`, the shadows as `--shadow-media` and `--shadow-float`, and layout measures as `--container-content`, `--container-measure`, `--spacing-header` and `--spacing-target`.

## Colors

| Token             | Value                      | Use                                                                                                                                                                                                                                                                                                             |
| ----------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lime`            | `#a7c947`                  | Main brand colour. Fills, bands and large marks with `on-lime` text on top (9.2:1). Never text, icons or button fills on `surface` (1.9:1). As `focus-inverse`, the focus ring on `teal` and `grape`.                                                                                                           |
| `lime-75`         | `#bdd775`                  | Lime 75% tint. Charts and decorative fills; `ink` text only.                                                                                                                                                                                                                                                    |
| `lime-50`         | `#d3e4a3`                  | Lime 50% tint. Selected rows and active filters; `ink`, `ink-muted` or `teal` text (5.1:1 or more).                                                                                                                                                                                                             |
| `lime-25`         | `#e9f2d1`                  | Lime 25% tint. Highlighted sections and the card hover; `ink`, `ink-muted` and `teal` text all pass (6.0:1 or more).                                                                                                                                                                                            |
| `teal`            | `#045c64`                  | The one interactive accent: links, primary buttons, the focus ring, the current nav item. As text on `surface`, `surface-alt` and every 25% tint (4.7:1 or more), never on full `lime`. As a deep band (hero, footer) behind `on-teal` text (7.7:1).                                                            |
| `teal-75`         | `#43858b`                  | Teal 75% tint. Charts and large shapes only; 4.2:1 on white is too low for text under 24px.                                                                                                                                                                                                                     |
| `teal-50`         | `#82aeb2`                  | Teal 50% tint. Charts and decorative fills with `ink` text.                                                                                                                                                                                                                                                     |
| `teal-25`         | `#c0d6d8`                  | Teal 25% tint. Tags and quiet fills with `ink` or `teal` text; muted text and footer links on `teal` bands (5.1:1); the secondary button hover.                                                                                                                                                                 |
| `aqua`            | `#4c979f`                  | Secondary brand hue for charts, illustrations and type 24px and up (3.4:1 on white). Never small text or a button fill.                                                                                                                                                                                         |
| `aqua-75`         | `#79b1b7`                  | Aqua 75% tint. Chart series and illustration fills.                                                                                                                                                                                                                                                             |
| `aqua-50`         | `#a6cbcf`                  | Aqua 50% tint. Chart series and illustration fills with `ink` text.                                                                                                                                                                                                                                             |
| `aqua-25`         | `#d2e5e7`                  | Aqua 25% tint. Info callouts and tags with `ink` or `teal` text.                                                                                                                                                                                                                                                |
| `grape`           | `#491f53`                  | Colour pop, at most one detail per view: a tag, one chart series, a small band. `on-teal` (13.1:1) or `lime` (6.9:1) text on it.                                                                                                                                                                                |
| `grape-75`        | `#77577e`                  | Grape 75% tint. Chart series only.                                                                                                                                                                                                                                                                              |
| `grape-50`        | `#a48fa9`                  | Grape 50% tint. Chart series with `ink` labels.                                                                                                                                                                                                                                                                 |
| `grape-25`        | `#d2c7d4`                  | Grape 25% tint. Rare tag fill with `ink` text; `ink-muted` falls short here (4.3:1).                                                                                                                                                                                                                            |
| `gray-light`      | `#e5e5e5`                  | Light Gray. Hairlines (as `line`) and disabled fills.                                                                                                                                                                                                                                                           |
| `gray-medium`     | `#a6a6a6`                  | Medium Gray. Disabled labels and inactive icons only (2.4:1 on white; disabled controls are exempt from contrast rules).                                                                                                                                                                                        |
| `gray-dark`       | `#3f3f3f`                  | Dark Gray. Icons and secondary marks on light surfaces; muted text on full `lime` where `ink-muted` falls short (5.6:1).                                                                                                                                                                                        |
| `surface`         | `#ffffff`                  | Page background and the default ground: the pedestal. Every text token reads on it.                                                                                                                                                                                                                             |
| `surface-alt`     | `#f2f2f2`                  | 5% black. Alternating sections, cards and the mobile menu panel; `ink` (15.6:1), `ink-muted` (6.3:1) and `teal` (6.9:1) text.                                                                                                                                                                                   |
| `header-material` | `#ffffffd9`                | The one translucent material: the sticky header and dropdown menus, 85% white over a backdrop blur. `ink` and `teal` stay above 5.4:1 whatever is underneath. Falls back to solid `surface` under reduced transparency, higher contrast or no backdrop-filter support. Never on cards, buttons or modal panels. |
| `ink`             | `#1a1a1a`                  | 90% black. Headlines and body text on every light surface, the 25% tints (10.7:1 or more), the 50% tints (5.9:1 or more), `lime-75` and full `lime` (9.2:1). Never on `teal-75` or `grape-75`.                                                                                                                  |
| `ink-muted`       | `#595959`                  | 65% black. Secondary text and metadata on `surface`, `surface-alt`, `lime-25`, `lime-50`, `teal-25` and `aqua-25` (4.6:1 or more). Not on full `lime` or `grape-25`.                                                                                                                                            |
| `on-teal`         | `#ffffff`                  | Text and icons on `teal` (7.7:1) and `grape` (13.1:1) fills and bands.                                                                                                                                                                                                                                          |
| `on-lime`         | `#1a1a1a` (= `ink`)        | Text and icons on `lime` fills: always `ink`, never white (white on lime is 1.9:1).                                                                                                                                                                                                                             |
| `line`            | `#e5e5e5` (= `gray-light`) | Decorative hairlines between sections, table rows and list items (1.3:1). Never the only edge of a control.                                                                                                                                                                                                     |
| `line-strong`     | `#808080`                  | 50% black. Borders of inputs, checkboxes and other controls on `surface`, `surface-alt` and `lime-25` (3.4:1 or more).                                                                                                                                                                                          |
| `link`            | `#045c64` (= `teal`)       | Inline links. Underlined in running text; the underline may drop only in navigation and card actions.                                                                                                                                                                                                           |
| `focus`           | `#045c64` (= `teal`)       | Keyboard focus ring on light surfaces: a solid 2px outline, 2px offset (4.1:1 or more on every light surface).                                                                                                                                                                                                  |
| `focus-inverse`   | `#a7c947` (= `lime`)       | Keyboard focus ring on `teal` and `grape` bands (4.1:1 and 6.9:1).                                                                                                                                                                                                                                              |
| `danger`          | `#b3261e`                  | Form errors and destructive actions, always with an icon and the word 'Error'. Text on `surface`, `surface-alt` and `danger-soft` (5.6:1 or more).                                                                                                                                                              |
| `danger-soft`     | `#fbeae9`                  | Background of an error message, with `danger` or `ink` text.                                                                                                                                                                                                                                                    |
| `success`         | `#045c64` (= `teal`)       | Confirmations, always with an icon and a word. Teal keeps success off the red-green axis.                                                                                                                                                                                                                       |
| `success-soft`    | `#c0d6d8` (= `teal-25`)    | Background of a confirmation message, with `teal` or `ink` text (5.1:1 or more).                                                                                                                                                                                                                                |

## Typography

Set `body` and `lead` with `font-serif`; everything else uses `font-sans`. Both load through `next/font/google`: Lato in 400 and 700 as `--font-lato`, Lora in 400 and 700, upright and italic, as `--font-lora`. Lato has no italic loaded, which fits the rule that UI text takes emphasis from bold.

| Style      | Family | Size             | Line height | Tracking | Weight | Use                                                                 |
| ---------- | ------ | ---------------- | ----------- | -------- | ------ | ------------------------------------------------------------------- |
| `display`  | sans   | 4rem (64px)      | 1.05        | -0.02em  | 700    | One per page: the hero headline on `surface` or a `teal` band.      |
| `title-1`  | sans   | 2.75rem (44px)   | 1.1         | -0.015em | 700    | Page titles on inner pages.                                         |
| `title-2`  | sans   | 2rem (32px)      | 1.2         | -0.01em  | 700    | Section headings.                                                   |
| `title-3`  | sans   | 1.5rem (24px)    | 1.25        | -0.005em | 700    | Card titles, subsections and the links in the mobile menu.          |
| `headline` | sans   | 1.1875rem (19px) | 1.35        | 0        | 700    | Small headings in dense layouts and footer column titles.           |
| `lead`     | serif  | 1.375rem (22px)  | 1.55        | 0        | 400    | The intro paragraph under a page title; one per page.               |
| `body`     | serif  | 1.125rem (18px)  | 1.65        | 0        | 400    | Long-form reading text: guides, articles and dataset descriptions.  |
| `ui`       | sans   | 1.0625rem (17px) | 1.5         | 0        | 400    | Card descriptions, table cells, form help and navigation links.     |
| `label`    | sans   | 1rem (16px)      | 1.5         | 0        | 700    | Buttons, card actions and form labels. Sentence case.               |
| `caption`  | sans   | 0.875rem (14px)  | 1.45        | 0.01em   | 400    | Metadata, footnotes, image credits and footer links. Never smaller. |
| `code`     | mono   | 0.9375rem (15px) | 1.6         | 0        | 400    | OMOP table and field names, identifiers and code.                   |

## Layout

### Spacing

Tailwind's default spacing unit is 0.25rem, so each token maps to a number utility: `space-24` is `p-6`, `gap-6`, `mt-6`.

| Token       | Value   | Tailwind           | Use                                                                     |
| ----------- | ------- | ------------------ | ----------------------------------------------------------------------- |
| `space-4`   | 0.25rem | `1` (e.g. `p-1`)   | Icon-to-label gap.                                                      |
| `space-8`   | 0.5rem  | `2` (e.g. `p-2`)   | Gaps inside controls; between a label and its field.                    |
| `space-12`  | 0.75rem | `3` (e.g. `p-3`)   | Between related lines in a card.                                        |
| `space-16`  | 1rem    | `4` (e.g. `p-4`)   | Page gutter on phones; between list items.                              |
| `space-24`  | 1.5rem  | `6` (e.g. `p-6`)   | Button side padding; gutter between cards; page gutter on wide screens. |
| `space-32`  | 2rem    | `8` (e.g. `p-8`)   | Card padding; between a heading and its content.                        |
| `space-48`  | 3rem    | `12` (e.g. `p-12`) | Between groups inside a section.                                        |
| `space-64`  | 4rem    | `16` (e.g. `p-16`) | Section padding on phones.                                              |
| `space-96`  | 6rem    | `24` (e.g. `p-24`) | Section padding on wide screens.                                        |
| `space-128` | 8rem    | `32` (e.g. `p-32`) | Above and below the hero headline on wide screens.                      |

### Measures

| Token           | Value   | Use                                                                  |
| --------------- | ------- | -------------------------------------------------------------------- |
| `content-max`   | 75rem   | Maximum width of page content; the layout locks here.                |
| `measure`       | 42.5rem | Maximum width of `body` and `lead` text, about 70 characters.        |
| `header-height` | 4rem    | Height of the global header.                                         |
| `target-min`    | 2.75rem | Minimum height of buttons, navigation items and other touch targets. |

## Elevation & Depth

- `shadow-media`: `0 24px 48px -16px #1a1a1a33`. Under product imagery such as a dashboard screenshot. Never on cards, buttons, menus or text.
- `shadow-float`: `0 8px 24px -8px #1a1a1a29`. Under layers that float over the page: dropdown menus and the mobile menu panel. Always paired with a 1px `line` border. Never on cards, buttons or text.
- `scrim`: `#1a1a1a66` (`ink` at 40%). Behind a modal layer only, dimming a page that is inert while the layer is open. Never behind a non-modal menu, and never with content on it.

## Shapes

| Token         | Value | Use                                                 |
| ------------- | ----- | --------------------------------------------------- |
| `radius-sm`   | 6px   | Inputs, tags and code chips.                        |
| `radius-md`   | 12px  | Cards, callouts and menus.                          |
| `radius-lg`   | 24px  | Large media: hero images and dashboard screenshots. |
| `radius-pill` | 999px | Buttons and badges.                                 |

## Components

These are the reference behaviours. Rebuild them with the repo's existing Radix and Tailwind setup; keep the class names your codebase uses, not these descriptions.

### Button

- Variants: `primary` (teal fill, white label, hover `ink`), `secondary` (2px teal outline and label, hover `teal-25` fill), `quiet` (underlined teal text). On teal or grape bands: primary is a lime fill with an `ink` label (hover white), secondary is a white outline.
- Pill shape (`rounded-pill`), at least `target-min` tall, `label` type, padding `space-24` either side.
- Press feedback on pointer-down: `active:scale-[0.97]` over 100ms. One primary button per view. Verb-first labels, no arrows.

### Header

- Sticky, `header-height` tall, `header-material` background with `backdrop-blur-[20px] backdrop-saturate-[1.8]`. Instead of a hard divider, a soft scroll-edge fade appears at its bottom edge only while content is scrolled underneath; at the top of the page there is no edge at all. Solid `surface` with a `line` hairline at the bottom under `prefers-reduced-transparency: reduce`, `prefers-contrast: more` (`line-strong`) and where backdrop-filter is unsupported.
- Set `scroll-padding-top` to `header-height` so the sticky header never covers the element that has keyboard focus or the target of an in-page link (WCAG 2.2 Focus Not Obscured).
- Left: the SciLifeLab logotype at 1.75rem tall (`scilifelab-logotype-pos.png`) and the site name "Precision Medicine Portal" as live text in Lato 400 at 1.0625rem, `space-24` apart. Never one image.
- Right: up to six nav links, 16px Lato 400 in `ink` with 44px targets; the current one `teal`, bold, `aria-current="page"`.
- Below 64em the links fold into a "Menu" pill button (2px `ink-muted` border) that opens a solid `surface` panel with `shadow-float` over the `scrim`, with `title-3` links separated by hairlines. The panel is modal: focus stays inside it and the page behind is inert while it is open. The panel stays mounted and moves with one CSS transition on opacity and translateY(-0.5rem) over 200ms, so a second tap reverses it mid-way; `visibility` keeps closed links out of the tab order. Escape closes it and returns focus to the button; choosing a link closes it. Under reduced motion it only cross-fades in 120ms. Below 35em the site name hides.

### Card

- For choices among peers only, laid out three across from 900px and one across on phones with `space-24` gaps.
- `surface-alt` fill (or `surface` with a `line` border on `surface-alt` sections), `radius-md`, padding `space-32`, no shadow.
- The title (`title-3`) is the only link, and a stretched `::after` makes the whole card its target; focus draws the `focus` ring around the card. Description in `ui` and `ink-muted`, action label in `label` and `teal` at the bottom.
- Hover fills `lime-25` and underlines the action; press scales to 0.99.

### Footer

- A `teal` band. The negative logotype at 2rem, a one-line tagline, the site map in dense columns (titles 16px bold `on-teal`, links `caption` in `teal-25`, at least 24px targets), the partner logos in negative versions above a `teal-75` hairline, and one closing line crediting the Data Science Node in Precision Medicine and Diagnostics with a link to the source code.
- Focus on this band uses `focus-inverse`.

## Logo files

The supplied files are in `next-app/public/brand/`. Use them as they are through `/brand/<filename>` URLs.

| File                                                                                        | Use                                                                         |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `scilifelab-logotype-pos.png`                                                               | Default logotype on light surfaces; the header.                             |
| `scilifelab-logotype-neg.png`                                                               | On `teal` and `grape`; the footer.                                          |
| `scilifelab-logotype-black.png`                                                             | Only where the green symbol would vanish on a light ground, such as `lime`. |
| `scilifelab-logotype-white.png`                                                             | Only where the green symbol would vanish on a dark ground, such as a photo. |
| `scilifelab-symbol-square-lime.png`                                                         | Favicon and app icons.                                                      |
| `scilifelab-symbol-square-green.png`, `scilifelab-symbol-square-black.png`                  | Avatars and other square formats.                                           |
| `scilifelab-symbol-green.png`, `scilifelab-symbol-black.png`, `scilifelab-symbol-white.png` | The symbol trimmed to its shape, for square formats only.                   |
| `ki-logotype-neg.png`, `kaw-logotype-white.png`                                             | Partner row in the footer, on `teal` only.                                  |

## Open decision

Whether the portal follows the DDLS graphical guidelines (Teal, Aqua and Grape as primary colours with Lime secondary, the KAW logo presented with SciLifeLab's, the full program name once) is not decided yet. Until it is, follow the SciLifeLab rules in this file.

A dark appearance that follows `prefers-color-scheme` is also undecided. It would need its own pairings within the brand colours: full `teal` falls below 3:1 on dark grounds, so links and focus would move to a light tint such as `teal-50`. Every pairing must be re-measured against the accessibility floor. Until then, the portal is light only.

### Temporary deviations until the header redesign

The current header predates v2: a grey-to-teal gradient band instead of `header-material`, desktop dropdowns, and a side sheet instead of the "Menu" panel. Until it is rebuilt to the Header spec above, these deviations stand. The redesign removes each one.

- Desktop nav links are solid `surface` tabs with `radius-md` corners, `gray-light` on hover and while open, so they stay legible on the dark band. The spec's plain `ink` links return with the light header.
- Their focus ring is drawn inside the tab (`-outline-offset-2`), because a 2px outside offset would land on the band. Return to the standard 2px offset.
- The menu button's focus ring is white (`on-teal`) rather than `focus-inverse`: lime reaches only about 2.5:1 on the band's grey top. Use `focus` on the light header.
- The desktop dropdowns open with the `nav-open` keyframes, which cross-fade under reduced motion. The spec asks for interruptible CSS transitions; the rebuilt menu panel replaces them.
- The mobile menu is a side sheet over the `scrim` and appears without a transition. The spec's mounted panel with one reversible transition replaces it.
- Nav link size: the links follow the Header spec at 16px, weight 400 (`text-base`), but the Type table lists navigation links under `ui` (17px). Settle which is right in the redesign.
- Desktop dropdowns stay solid `surface` with `shadow-float` instead of the material, because their items still use pre-v2 descriptions in `ink-muted` at caption size, which the material does not allow. The redesigned menu moves them onto the material.
- `scroll-padding-top` arrives with the sticky header; today's header scrolls away with the page.
