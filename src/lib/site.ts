export const FIELD_FT = { length: 360, width: 160 } as const;
export const FIELD_SQFT = FIELD_FT.length * FIELD_FT.width;
/** Louisiana Economic Development, 13 July 2026: Meta Richland Parish, nearly 10 million sq ft. */
export const HYPERION_SQFT = 10_000_000;
export const HALLS_AT_HYPERION = HYPERION_SQFT / FIELD_SQFT;

export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
  };
}

export const nav = [
  {
    href: "/labs",
    label: "Labs",
  },
  {
    href: "/science",
    label: "Science",
  },
  {
    href: "/price",
    label: "Price",
  },
  {
    href: "/data",
    label: "Data",
  },
  {
    href: "/alzheimers",
    label: "Alzheimer’s",
  },
  {
    href: "/news",
    label: "News",
  },
] as const;

export const today = [
  {
    n: "01",
    title: "Lit rooms",
    body: "The bench is a human workstation, so the lights stay on for someone’s eyes.",
  },
  {
    n: "02",
    title: "One walk at a time",
    body: "Hood, incubator, sequencer. The protocol is secretly a person carrying a tube.",
  },
  {
    n: "03",
    title: "A paper, if the quarter is kind",
    body: "The unit of progress is a write-up. The disease does not read it.",
  },
  {
    n: "04",
    title: "Still on the list",
    body: "Alzheimer’s has partial treatments. It does not have an ending. It is also not a schedule.",
  },
] as const;

export const darkLab = [
  {
    n: "01",
    title: "Never off",
    body: "24 hours, 7 days, 365. No shift change. The gantry does not wait for morning.",
  },
  {
    n: "02",
    title: "CRISPR and mRNA",
    body: "The only two modalities. Design, make, edit, read, decide. One loop.",
  },
  {
    n: "03",
    title: "Sold to frontier labs",
    body: "Every closed loop is a record. That is what we sell. Patient charts are not the product.",
  },
  {
    n: "04",
    title: "Either one can finish first",
    body: "CRISPR or mRNA. Whichever closes a disease sooner is the one that does it. The hall runs both.",
  },
] as const;

export const bays = [
  {
    id: "01",
    name: "Design",
    kind: "mRNA",
    line: "A sequence for a microglial program. Written by the loop, not drafted in a meeting and walked down the hall.",
  },
  {
    id: "02",
    name: "Synthesis",
    kind: "mRNA",
    line: "The oligo line runs unattended. The product does not wait on someone to carry a tube.",
  },
  {
    id: "03",
    name: "Particle",
    kind: "mRNA",
    line: "Lipid nanoparticle, formed and sized, held cold. No one opens the door to look at it.",
  },
  {
    id: "04",
    name: "Dose",
    kind: "mRNA",
    line: "Into iPSC neurons and a barrier model. The question is whether the program arrives and does the work.",
  },
  {
    id: "05",
    name: "Library",
    kind: "CRISPR",
    line: "Guides against loci that keep returning in Alzheimer’s — TREM2, and the genes around it. A library, not a hunch.",
  },
  {
    id: "06",
    name: "Edit",
    kind: "CRISPR",
    line: "Ribonucleoprotein into microglia. The edit is the question. The cell is allowed to answer overnight.",
  },
  {
    id: "07",
    name: "Read",
    kind: "Shared",
    line: "Sequence the edit. Read the phenotype. Both land in the same record, with the protocol still attached.",
  },
  {
    id: "08",
    name: "Decide",
    kind: "Shared",
    line: "Keep, kill, or rewrite. Bay 01 is already being queued. That is a closed loop.",
  },
] as const;

export const queue = [
  { n: "—", name: "Alzheimer’s", modality: "CRISPR or mRNA", state: "Long mission. Not scheduled first." },
  { n: "—", name: "Parkinson’s", modality: "CRISPR or mRNA", state: "On the list. Not a schedule." },
  { n: "—", name: "ALS", modality: "CRISPR or mRNA", state: "On the list. Not a schedule." },
  { n: "—", name: "Huntington’s", modality: "CRISPR or mRNA", state: "On the list. Not a schedule." },
  { n: "—", name: "Frontotemporal dementia", modality: "CRISPR or mRNA", state: "On the list. Not a schedule." },
  { n: "—", name: "Glioblastoma", modality: "CRISPR or mRNA", state: "On the list. Not a schedule." },
] as const;

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string };

export type Story = {
  slug: string;
  kicker: string;
  date: string;
  title: string;
  dek: string;
  blocks: StoryBlock[];
};

export const stories: Story[] = [
  {
    slug: "lights-go-off",
    kicker: "Labs",
    date: "November 18, 2026",
    title: "The lights go off on purpose",
    dek: "A car plant kills the overheads when the line no longer needs a person in the aisle. A wet lab can do the same, if you stop designing it around a bench.",
    blocks: [
      {
        type: "p",
        text: "A factory does not go dark to be dramatic. It goes dark because the work no longer needs a person in the aisle, and light is a cost. Automotive lines have been built this way for years. The cell runs. The overheads stay off. Someone, somewhere else, can still hit stop.",
      },
      {
        type: "p",
        text: "Wet labs kept the lights on for a worse reason than tradition. The bench is a human workstation. Pipettes, timers, the walk from the hood to the incubator, the label written at an angle. If a person has to be there, you light the room for their eyes. Almost every protocol in drug discovery is still secretly a walk.",
      },
      {
        type: "h2",
        text: "Design the aisle empty",
      },
      {
        type: "p",
        text: "Incurable? starts from the other end. Hall 01 is a football field — 360 by 160 feet, end zones included — specified with nobody in it. Liquid handlers, a synthesis line, cell rooms, sequencers, and a gantry that is the only thing moving. CRISPR and mRNA are not two departments down a corridor. They are stations on one loop. A sequence is designed, made, put into a particle or a cell, read, and replaced by the next sequence before a person would have finished labeling the first tube.",
      },
      {
        type: "p",
        text: "The romance of the lit lab is real. So is the pace. The incurable list has not been waiting on a more inspiring poster. What has been missing is the number of closed loops a year. People do not produce that number. A dark hall can.",
      },
      {
        type: "p",
        text: "We are not hiding the stop switch inside the autonomy. The floor is empty. The stop is a person, off the floor. That is the same bargain as a lights-out plant, and it is the only version of this idea that should be built. Containment stays a designed envelope — air, interlocks, a kill that a human still owns. Autonomy is what happens inside that envelope, not a reason to erase it.",
      },
    ],
  },
  {
    slug: "use-the-field",
    kicker: "Scale",
    date: "November 12, 2026",
    title: "Use the football field anyway",
    dek: "Biology talks about scale and then means a longer bench. The unit is wrong. It is still the clearest ruler we have.",
    blocks: [
      {
        type: "p",
        text: "A regulation football field, end zones included, is 120 yards by 53 and a third. In feet: 360 by 160. Fifty-seven thousand six hundred square feet. Call that Hall 01. One module. Lights off. CRISPR and mRNA on a single gantry.",
      },
      {
        type: "p",
        text: "Meta’s largest campus, Hyperion, in Richland Parish, Louisiana, was described by Louisiana Economic Development in July 2026 as nearly ten million square feet — the biggest floorplate in Meta’s fleet, built so training runs have somewhere to live. Ten million divided by one field is 173.6. We are not claiming their parish, their power contract, or their capital. We are stealing the reference. When a technical problem is important enough, this is the size of building people already know how to put up.",
      },
      {
        type: "h2",
        text: "The ceiling was never a university floor",
      },
      {
        type: "p",
        text: "Drug discovery has been acting as if it were. A bigger grant. A longer bench. Another core facility down the street that closes at six. Hall 01 is the part you can walk in your head. The campus is the part that makes a disease a throughput problem instead of a pilgrimage. You do not get a medicine by wishing harder inside one room. You get it by running the question so many times that the failures are cheap and a hit has somewhere to go next.",
      },
      {
        type: "p",
        text: "Earlier figures for the same Meta campus said four million square feet. We use the later, larger number, and we say so. Either figure is already a different species of building than a lab with a coffee machine. The field is a crude ruler. Use it anyway. Everyone already knows how long one is.",
      },
    ],
  },
  {
    slug: "sell-the-data",
    kicker: "Data",
    date: "November 4, 2026",
    title: "Sell the data. Keep the mission.",
    dek: "Foundation models will buy biology the way they buy compute. The corpus is not a patient’s chart, and the list of diseases is not for sale.",
    blocks: [
      {
        type: "p",
        text: "Every closed loop in the hall writes something the public web does not have. A sequence, an edit, a cell state, a phenotype, and the protocol that produced them, in an order a model can replay. That is not a medical record. We do not broker charts, and we do not scrape a hospital to dress it up as proprietary. The corpus is made on purpose, by machines, inside a hall we control.",
      },
      {
        type: "p",
        text: "Foundation models are hungry for exactly this, and they cannot browse their way to it. Text on the internet is not a microglia responding to a guide. Labs buy compute from data centers because compute does not appear by wishing. They will buy biology from whoever can mint it at a steady clip, with the metadata still attached.",
      },
      {
        type: "h2",
        text: "A business, not the point",
      },
      {
        type: "p",
        text: "So we sell the data. That pays for the next hall. It is not the mission. The long mission is the list of diseases still called incurable — Alzheimer’s among them, not promised as the first — and it does not get sold. A model trained on our loops should make the next loop smarter. The medicine, when one exists, is for people.",
      },
      {
        type: "p",
        text: "There is a dull version of this company that becomes a data vendor and forgets the list. There is a pious version that refuses to sell anything and never builds hall two. We are neither. The data is how the lights stay off. The list is why the building exists.",
      },
    ],
  },
  {
    slug: "first-name-on-the-list",
    kicker: "Alzheimer’s",
    date: "October 28, 2026",
    title: "Alzheimer’s is the long mission, not the schedule",
    dek: "The firm is here to take it off the list. The hall may finish something else first, with mRNA or with CRISPR.",
    blocks: [
      {
        type: "p",
        text: "Alzheimer’s is common, fatal, and only partly answered. Lecanemab and donanemab — antibodies against amyloid — can slow cognitive decline for some people, with real risks, including swelling and bleeding in the brain. That is not nothing. It is also not a cure, and it leaves the rest of the biology standing: tau, microglia, the vessels, the blood-brain barrier.",
      },
      {
        type: "p",
        text: "That remainder is an argument for a loop, not against one. mRNA is a way to send a program into a cell that has lost one. CRISPR is a way to ask which genes, in which cells, actually move a phenotype, at a count no bench will pipette. The hall runs those questions. It does not announce that it has finished them.",
      },
      {
        type: "h2",
        text: "Incurable is a filing status",
      },
      {
        type: "p",
        text: "We will not pretend a building is a readout. Hall 01 does not come with a claim of a cure, a trial slot, or a date, and it does not come with a promise that Alzheimer’s is the first name it can finish. A nearer disease may fall sooner. It may be an mRNA, or it may be a CRISPR edit. The long mission does not change because the first closed disease is a different one. Parkinson’s. ALS. Huntington’s. The diseases families are still told to make peace with. Alzheimer’s is on that list. It is why the firm exists. It is not a run order.",
      },
      {
        type: "p",
        text: "Incurable is a word people use when the current tools have stopped being enough. It is not a law of nature. Says who is not a taunt at the families. It is a question aimed at the building.",
      },
    ],
  },
];

export function storyBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export const interests = [
  {
    id: "data",
    label: "Data",
    note: "You buy assay data for a frontier lab.",
  },
  {
    id: "build",
    label: "The build",
    note: "Halls, automation, containment, power. You know what a dark factory costs.",
  },
  {
    id: "press",
    label: "Press",
    note: "Ask for the precise claim. We will not upgrade it for you.",
  },
  {
    id: "family",
    label: "A family",
    note: "If you need a treatment, read this before you write.",
  },
] as const;
