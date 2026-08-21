import type { ReactElement } from "react";
import { Card } from "@/components/ui/card";

/**
 * Palette from `globals.css`, referenced as CSS variables rather than hex
 * literals so the diagram tracks the theme. Two values have no token: the
 * SciLifeLab aqua keyline, and the lime tint (the lime token at `fillOpacity`).
 */
const COLOR = {
  ink: "var(--color-foreground)",
  muted: "var(--color-muted-foreground)",
  border: "var(--color-border)",
  primary: "var(--color-primary)",
  surface: "var(--color-card)",
  lime: "var(--color-accent)",
  /** SciLifeLab aqua. The palette in globals.css has no name for it. */
  aqua: "#4c979f",
} as const;

/** Top edge of each of the three stacked "Disclosure decision" boxes. */
const REGION_ROWS = [40, 122, 204];

/**
 * The one idea the NGP page has to land: access needs two approvals in series,
 * and the second one repeats for every healthcare region holding data.
 * Researchers routinely assume ethical approval is sufficient.
 *
 * Rendered as a white card floating on the page's teal band, so the caption is
 * styled for a dark ground. Every fact here is also stated in the surrounding
 * copy — the diagram is never the only place a reader can find it.
 *
 * Colour carries meaning only twice: teal marks the single national gate, a
 * lime tint marks the repeated regional one. Lime is 1.89:1 on white, failing
 * both AA text contrast and the 3:1 minimum for graphical objects, so it holds
 * no text and no load-bearing edge — the GATE 2 label is teal (matching GATE 1)
 * and the region boxes take aqua keylines. Do not restore lime on either.
 *
 * Scrolls horizontally below its `min-w-175` floor (43.75rem, 700px at the
 * default root font size) rather than shrinking its labels into illegibility.
 * That floor is rem-based, so it tracks the reader's text-size setting: at 200%
 * the diagram doubles and its labels scale with it.
 */
export function TwoGatesDiagram(): ReactElement {
  return (
    <figure>
      <Card className="overflow-x-auto border-0 p-6">
        <svg
          viewBox="0 0 860 300"
          role="img"
          aria-label="Two approvals in series. A project first needs national ethical approval, then a separate disclosure decision from each healthcare region holding the data it needs. Only after a region has decided does that region tag its data, making it visible to the project in GMC Joint."
          className="block h-auto w-full min-w-175 font-sans"
        >
          <defs>
            <marker
              id="ngp-arrow-gates"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={COLOR.muted} />
            </marker>
          </defs>

          {/* Your project */}
          <rect
            x="1"
            y="118"
            width="132"
            height="64"
            rx="4"
            fill={COLOR.surface}
            stroke={COLOR.border}
            strokeWidth="1.5"
          />
          <text
            x="67"
            y="145"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLOR.ink}
          >
            Your project
          </text>
          <text
            x="67"
            y="164"
            textAnchor="middle"
            fontSize="12"
            fill={COLOR.muted}
          >
            research principal
          </text>

          <line
            x1="137"
            y1="150"
            x2="170"
            y2="150"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />

          {/* Gate 1: one national decision */}
          <rect
            x="176"
            y="96"
            width="196"
            height="108"
            rx="4"
            fill={COLOR.surface}
            stroke={COLOR.primary}
            strokeWidth="1.5"
          />
          <text
            x="194"
            y="122"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.08em"
            fill={COLOR.primary}
          >
            GATE 1
          </text>
          <text x="194" y="150" fontSize="16" fontWeight="700" fill={COLOR.ink}>
            National ethical
          </text>
          <text x="194" y="170" fontSize="16" fontWeight="700" fill={COLOR.ink}>
            approval
          </text>
          <text x="194" y="190" fontSize="11.5" fill={COLOR.muted}>
            once, for the whole study
          </text>

          {/* Gate 1 fans out to one decision per holding region */}
          <path
            d="M 372 150 C 396 150 396 68 420 68"
            fill="none"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />
          <line
            x1="372"
            y1="150"
            x2="420"
            y2="150"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />
          <path
            d="M 372 150 C 396 150 396 232 420 232"
            fill="none"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />

          <text
            x="430"
            y="30"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.08em"
            fill={COLOR.primary}
          >
            GATE 2
          </text>
          <text x="482" y="30" fontSize="11.5" fill={COLOR.muted}>
            one decision per region holding your data
          </text>

          {REGION_ROWS.map((y, index) => (
            <g key={y}>
              <rect
                x="430"
                y={y}
                width="222"
                height="56"
                rx="4"
                fill={COLOR.lime}
                fillOpacity={0.12}
                stroke={COLOR.aqua}
                strokeWidth="1.5"
              />
              <text
                x="446"
                y={y + 24}
                fontSize="14"
                fontWeight="700"
                fill={COLOR.ink}
              >
                Disclosure decision
              </text>
              <text x="446" y={y + 42} fontSize="12" fill={COLOR.muted}>
                {`holding region ${index + 1}`}
              </text>
            </g>
          ))}

          <text
            x="541"
            y="284"
            textAnchor="middle"
            fontSize="12"
            fill={COLOR.muted}
          >
            each region decides independently
          </text>

          {/* Only a region that has decided can tag its data */}
          <path
            d="M 652 68 C 680 68 680 150 704 150"
            fill="none"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />
          <line
            x1="652"
            y1="150"
            x2="704"
            y2="150"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />
          <path
            d="M 652 232 C 680 232 680 150 704 150"
            fill="none"
            stroke={COLOR.muted}
            strokeWidth="1.5"
            markerEnd="url(#ngp-arrow-gates)"
          />

          <rect
            x="712"
            y="110"
            width="147"
            height="80"
            rx="4"
            fill={COLOR.primary}
          />
          <text x="730" y="140" fontSize="14" fontWeight="700" fill="#ffffff">
            Tagged data
          </text>
          <text x="730" y="158" fontSize="14" fontWeight="700" fill="#ffffff">
            in GMC Joint
          </text>
          <text x="730" y="176" fontSize="11.5" fill="rgba(255, 255, 255, 0.8)">
            your project only
          </text>
        </svg>
      </Card>
      <figcaption className="mt-3 text-sm leading-normal text-white/75">
        Two approvals in series. National ethical approval is granted once. A
        separate disclosure decision is then needed from every region holding
        data you want, and only that region can tag its data for your project.
      </figcaption>
    </figure>
  );
}
