import type { PluggableList } from "unified";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema, type Schema } from "rehype-sanitize";

// Extend the default sanitize schema to allow common GitHub README HTML
// while keeping a conservative, safe set of tags and attributes.
const markdownSanitizeSchema: Schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "img",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "br",
  ],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    a: [
      ...((defaultSchema.attributes?.a as unknown[]) ?? []),
      "href",
      ["target", /^(?:_blank|_self|_parent|_top)$/],
      [
        "rel",
        /^(?:noopener|noreferrer|nofollow|ugc|noopener noreferrer|noreferrer noopener|nofollow noopener noreferrer)$/,
      ],
      "className",
    ],
    p: [
      ...((defaultSchema.attributes?.p as unknown[]) ?? []),
      ["align", /^(?:left|center|right|justify)$/],
      "className",
    ],
    img: [
      ...((defaultSchema.attributes?.img as unknown[]) ?? []),
      "src",
      "alt",
      ["width", /^\d+$/],
      ["height", /^\d+$/],
      ["align", /^(?:left|center|right)$/],
      "className",
    ],
    table: [
      ...((defaultSchema.attributes?.table as unknown[]) ?? []),
      "className",
    ],
    thead: [
      ...((defaultSchema.attributes?.thead as unknown[]) ?? []),
      "className",
    ],
    tbody: [
      ...((defaultSchema.attributes?.tbody as unknown[]) ?? []),
      "className",
    ],
    tr: [...((defaultSchema.attributes?.tr as unknown[]) ?? []), "className"],
    th: [
      ...((defaultSchema.attributes?.th as unknown[]) ?? []),
      ["align", /^(?:left|center|right)$/],
      "className",
    ],
    td: [
      ...((defaultSchema.attributes?.td as unknown[]) ?? []),
      ["align", /^(?:left|center|right)$/],
      "className",
    ],
  },
};

export const markdownRehypePlugins: PluggableList = [
  rehypeRaw,
  [rehypeSanitize, markdownSanitizeSchema],
];

export default markdownRehypePlugins;
