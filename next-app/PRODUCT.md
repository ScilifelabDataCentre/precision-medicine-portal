# Precision Medicine Portal

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Researchers and professionals working in precision medicine, including clinical
and translational research. They need to identify relevant Swedish data sources,
understand the next step for access, and find research data management guidance.

## Product Purpose

A public portal that helps researchers find Swedish data sources and access
guidance. A useful visit ends with a relevant source, a clear route to the
responsible institution, or appropriate guidance and support.

The portal is developed and maintained by SciLifeLab Data Centre and the Data
Science Node in Precision Medicine and Diagnostics, hosted at Karolinska
Institutet and SciLifeLab.

## Operating Context

Researchers browse or search curated source descriptions, follow links to
registries, cohorts, catalogues and platforms, and consult guidance on standards
and data management. Data requests go to the responsible institutions; listing
a source here does not grant access to its data.

## Capabilities and Constraints

- Curated listings for Swedish quality registries, research cohorts and
  biobank-based studies, plus links to other data sources.
- Information about the National Genomics Platform, the OMOP Common Data Model,
  DIGIfor1healthSE, and the node's projects and partners.
- Guidance and links for data access, research data management and sensitive data.
- Contact and correction routes for researchers and source owners.
- Preserve the existing factual content, source links, attribution and access
  notices during design changes. Verify any proposed factual change separately.
- Keep the existing Next.js, React, TypeScript, Tailwind and Radix setup unless a
  task explicitly calls for an architectural change.

## Brand Commitments

Preserve the Precision Medicine Portal name and SciLifeLab identity. Write clear,
direct, researcher-focused English and preserve official names and terminology.
The fixed brand rules and visual conventions are maintained in [DESIGN.md](DESIGN.md).

Whether to adopt the DDLS-specific graphical guidelines remains an open decision
recorded in DESIGN.md. Use the current SciLifeLab rules until that is decided.

## Evidence on Hand

- [Repository README](../README.md): purpose, ownership and technical setup.
- `src/assets/`: the curated registry and research-cohort records.
- `src/app/`: published content, source links and page metadata.
- `src/components/common/DataAccessNotice.tsx`: shared data-access wording.
- `public/brand/`: supplied SciLifeLab and partner brand assets.
- [DESIGN.md](DESIGN.md): the approved v2 design direction and accessibility floor.

Use the actual records and cited sources for counts and claims. Do not invent
research results, testimonials or usage statistics for a design proposal.

## Accessibility & Inclusion

Preserve the documented WCAG 2.1 AA minimum. Support keyboard navigation,
readable contrast, responsive layouts and reduced-motion preferences. Follow the
specific requirements and verification steps in DESIGN.md.
