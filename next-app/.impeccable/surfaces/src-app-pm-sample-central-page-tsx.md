---
version: 1
slug: "src-app-pm-sample-central-page-tsx"
primary_target: "src/app/pm-sample-central/page.tsx"
related_targets: []
---

# PM Sample Central

Scope: the `/pm-sample-central` page, a main-nav item. Mode: Read, with one action (a project request), request first. Visual world: DESIGN.md v2, unchanged.

Audience and job: researchers and clinical teams planning a study who may use PMSC services, plus readers who need to understand what PMSC is. A good visit ends with an iLab request or an email, or with the reader understanding the two-track idea.

Content: the PMSC team's draft, verbatim except hard grammar fixes and Jan's October 2026 edits: no dash connectors, no references or "(2)", no "Work Package" labels, British spelling, FFPE/SOPs/AML written out on first use, paragraph breaks at natural turns, no full stops ending headings. Open draft questions live as `Draft:` comments in `src/components/pm-sample-central/content.tsx`. Images to come: a lab photo and a dashboard screenshot (briefs in `IMAGES`); slots render only once a file exists.

## Direction contract

THESIS: The page is laid out the way the content describes PMSC: a sample and its record run in parallel, tied by one ID. It refuses the generic stack of identical heading-and-text sections.

OWN-WORLD: DESIGN.md v2 at full brand strength. The diagram is the brand illustration: full lime for the sample, full aqua for the record, joined into one object per stage, numbered 1 to 4, with grape only where they meet. The diagram is the one bold moment; the track columns stay quiet. The service sheet is the one surface-on-alt panel. The pilots form a ruled register. The request is the one teal band. Hairlines throughout, no cards.

STORY: The visitor sees what PMSC is, can request at once, and sees the mechanism in the same opening. They read the two tracks side by side, the lab's services, the pilot studies as proof and why it is needed, then request a project and see what following one will look like. Every section ends on one next step.

FIRST VIEWPORT: On white: the display-size h1 on one line at 1280. Below it, the serif lead at measure on the left and the iLab and email pills stacked on the right. Then "What do we do?" and the diagram's numbered lime row, all within 1280×800.

FORM: Two tracks, one ID (position 1 of 7, dealt card 2 of 3, seed key 73398e63), chosen by Jan on 2026-10-02. Raised the same day at Jan's request: full-colour diagram, a content-led layout pass (parallel tracks, service sheet, register), then an Apple and DESIGN.md pass (space-128 hero, next steps, higher-contrast hairlines, press colours, forced-colours edges, the step bars and pull quote removed).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Memorable moment: the joined lime-and-aqua stages, numbered 1 to 4, meeting in grape.

Unresolved: draft content questions (Sarcoma details, MAATEO partners, OMOP sentences, department names, Data Center vs Data Centre); the header redesign (combined logo image, logo scaling with six items, menubar roles).
