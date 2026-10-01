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

  function rowFor(item: string): {
    row: string;
    checkboxId: string;
    labelTag: string;
  } {
    const id = `filter-Organisation-${item}`;
    const label = html.match(new RegExp(`<label[^>]*for="${id}"[^>]*>`));
    const checkbox = html.match(new RegExp(`<button[^>]*id="${id}"[^>]*>`));
    const row = html.match(
      new RegExp(`<div class="([^"]*)"><button[^>]*id="${id}"`),
    );
    if (!label || !checkbox || !row)
      throw new Error(`row for ${item} not found in: ${html}`);
    return { row: row[1], checkboxId: id, labelTag: label[0] };
  }

  it("ties every label to its checkbox, including ids with spaces", () => {
    for (const item of ["Registercentrum Norr", "Registercentrum Syd"]) {
      expect(rowFor(item).labelTag).toContain(
        `for="filter-Organisation-${item}"`,
      );
    }
  });

  it("makes each row at least target-min tall", () => {
    expect(rowFor("Registercentrum Norr").row.split(" ")).toContain(
      "min-h-target",
    );
  });

  it("stretches the label across the row so the whole row is clickable", () => {
    const classes =
      rowFor("Registercentrum Norr")
        .labelTag.match(/class="([^"]*)"/)?.[1]
        .split(" ") ?? [];
    expect(classes).toEqual(
      expect.arrayContaining([
        "flex-1",
        "min-h-target",
        "cursor-pointer",
        "text-ui",
      ]),
    );
  });

  it("shows the item count in the visible label", () => {
    expect(html).toContain("Registercentrum Norr (20)");
  });
});
