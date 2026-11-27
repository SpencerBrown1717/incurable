import type { ReactNode } from "react";
import { SiteFigure } from "@/components/site/site-figure";

const figures: Record<
  string,
  { label: string; caption: string; drawing: ReactNode }
> = {
  desk: {
    label: "Loose sheets of editorial notes in a fine outline",
    caption: "Research, scale, data, and mission",
    drawing: (
      <>
        <g className="figure-grid">
          <path d="M74 51h492M74 209h492M155 34v192m330-192v192" />
          <path d="M78 67h12m-6-6v12m471 121h12m-6-6v12" />
        </g>
        <path
          className="figure-outline"
          d="M202 188l-17-117 217-20 13 18m-203 133 229-24 10-114-30-4m-208 153 237-22"
        />
        <path
          className="figure-strong"
          d="M204 74h232v113H204zm24 24h71m-71 17h150m-150 17h173m-173 17h144m-144 17h87"
        />
        <g className="figure-violet figure-pulse">
          <path d="M408 85h17v17h-17zm4 8 3 3 6-6" />
        </g>
      </>
    ),
  },
  "lights-go-off": {
    label: "An illuminated center aisle inside the dark outline of a hall",
    caption: "Lights-out hall concept",
    drawing: (
      <>
        <g className="figure-grid">
          <path d="M82 215 320 100l238 115M142 215 320 112l178 103M199 215 320 122l121 93M271 215l49-79 49 79M320 128v87M82 215h476M131 192h378M183 168h274M234 145h172" />
        </g>
        <g className="figure-outline">
          <path d="M83 213v-69L320 42l237 102v69M200 167v-40l120-56 120 56v40M262 143v-26l58-27 58 27v26" />
          <path d="M119 205v-62l201-87 201 87v62" />
        </g>
        <path className="figure-strong" d="M296 150v-27h48v27M307 134h26" />
        <path className="figure-cyan figure-pulse" d="M320 153v62" />
        <circle className="figure-amber" cx="320" cy="193" r="4" />
      </>
    ),
  },
  "use-the-field": {
    label:
      "An American football field drawn as a ruler for the size of one hall",
    caption: "One field, one conceptual hall",
    drawing: (
      <>
        <path
          className="figure-grid"
          d="M74 41h492M74 219h492M105 29v202m430-202v202"
        />
        <path className="figure-strong" d="M105 49h430v162H105z" />
        <path
          className="figure-outline"
          d="M141 49v162m36-162v162m36-162v162m36-162v162m36-162v162m35-162v162m35-162v162m36-162v162m36-162v162m36-162v162m36-162v162M141 104h358M141 156h358"
        />
        <path
          className="figure-violet"
          d="M105 59h36v142h-36m430-142h-36v142h36"
        />
        <g className="figure-cyan figure-pulse">
          <path d="M105 231v10m430-10v10M105 236h430" />
        </g>
      </>
    ),
  },
  "sell-the-data": {
    label: "Abstract observations connected to a set of research records",
    caption: "Research records, illustrated",
    drawing: (
      <>
        <path
          className="figure-grid"
          d="M67 61h506M67 131h506M67 201h506M97 35v190m446-190v190"
        />
        <path
          className="figure-outline"
          d="M100 92h77l39 38h63m-179 39h77l39-39m65 0h78"
        />
        <g className="figure-cyan figure-pulse">
          <circle cx="114" cy="92" r="4" />
          <circle cx="166" cy="169" r="4" />
          <circle cx="254" cy="130" r="4" />
        </g>
        <g className="figure-strong">
          <path d="M364 58h165v144H364zm0 48h165m-165 48h165" />
          <path d="M401 77h89m-89 10h59m-59 38h89m-89 10h59m-59 38h89m-89 10h59" />
        </g>
        <path className="figure-violet" d="M379 81h9m-9 48h9m-9 48h9" />
      </>
    ),
  },
  "first-name-on-the-list": {
    label: "A branching network with one research direction highlighted",
    caption: "One direction within a longer research mission",
    drawing: (
      <>
        <path
          className="figure-grid"
          d="M69 76h502M69 130h502M69 184h502M149 42v176m171-176v176m171-176v176"
        />
        <g className="figure-outline" strokeLinecap="round">
          <path d="M110 130c62 0 82-34 133-34s71 34 107 34m-161-16c17 10 32 50 84 50m-30-68c27-13 43-29 55-51m52 85c64 0 73 61 131 61h35m-166-61c62 0 61-49 136-49h30" />
          <circle cx="110" cy="130" r="5" />
          <circle cx="298" cy="45" r="4" />
          <circle cx="273" cy="164" r="4" />
          <circle cx="516" cy="81" r="4" />
          <circle cx="516" cy="191" r="4" />
        </g>
        <path className="figure-violet figure-pulse" d="M350 130h193" />
        <circle className="figure-cyan" cx="548" cy="130" r="6" />
      </>
    ),
  },
};

export function NewsFigure({
  storySlug = "desk",
  className,
}: {
  storySlug?: string;
  className?: string;
}) {
  const figure = figures[storySlug];
  if (!figure) return null;

  return (
    <SiteFigure
      label={figure.label}
      caption={figure.caption}
      viewBox="0 0 640 260"
      className={className}
    >
      {figure.drawing}
    </SiteFigure>
  );
}
