/**
 * The house style for an inline link in running text: primary colour plus a
 * persistent underline, so the link is not distinguishable by colour alone
 * (WCAG 1.4.1 Use of Colour), and a visible focus ring.
 *
 * Defined once here rather than re-typed per page, so a change to the focus
 * ring is a one-line change instead of a grep across the app - and so a copy
 * with its classes in a different order cannot hide from that grep.
 */
export const linkClassName =
  "text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded";
