import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FilterSection } from "./FilterSection";

/**
 * Markup-contract tests (Vitest runs in the node environment, no DOM).
 * Each filter row must be a full-height target: DESIGN.md requires
 * controls at least `target-min` tall, and the 20px checkbox alone is not.
 */
describe("FilterSection", () => {
  const html = renderToStaticMarkup(
    <FilterSection
      title="Organisation"
      items={["Registercentrum Norr", "Registercentrum Syd"]}
      selectedItems={["Registercentrum Syd"]}
      onFilterChange={() => {}}
      getItemCount={(item) => item.length}
    />,
  );

  function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function rowFor(item: string): {
    row: string;
    checkboxTag: string;
    labelTag: string;
  } {
    const id = escapeRegExp(`filter-Organisation-${item}`);
    const label = html.match(new RegExp(`<label[^>]*for="${id}"[^>]*>`));
    const checkbox = html.match(new RegExp(`<button[^>]*id="${id}"[^>]*>`));
    const row = html.match(
      new RegExp(`<div class="([^"]*)"><button[^>]*id="${id}"`),
    );
    if (!label || !checkbox || !row)
      throw new Error(`row for ${item} not found in: ${html}`);
    return { row: row[1], checkboxTag: checkbox[0], labelTag: label[0] };
  }

  function classesOf(tag: string): string[] {
    return tag.match(/class="([^"]*)"/)?.[1].split(" ") ?? [];
  }

  it("ties every label to its checkbox, including ids with spaces", () => {
    const labels = html.match(/<label[^>]*for="filter-Organisation-/g) ?? [];
    expect(labels).toHaveLength(2);
    for (const item of ["Registercentrum Norr", "Registercentrum Syd"]) {
      expect(rowFor(item).labelTag).toContain(
        `for="filter-Organisation-${item}"`,
      );
    }
  });

  it("makes each row at least target-min tall", () => {
    const classes = rowFor("Registercentrum Norr").row.split(" ");
    expect(classes).toContain("min-h-target");
    expect(classes).toContain("items-center");
  });

  it("stretches the label across the row so the whole row is clickable", () => {
    const classes = classesOf(rowFor("Registercentrum Norr").labelTag);
    expect(classes).toEqual(
      expect.arrayContaining([
        "flex-1",
        "min-h-target",
        "items-center",
        "-ml-3",
        "pl-3",
        "cursor-pointer",
        "text-ui",
      ]),
    );
    expect(classes).not.toContain("leading-none");
  });

  it("names each checkbox by its visible label", () => {
    expect(rowFor("Registercentrum Norr").checkboxTag).not.toContain(
      "aria-label",
    );
  });

  it("shows the item count in the visible label", () => {
    expect(html).toContain("Registercentrum Norr (20)");
  });
});
