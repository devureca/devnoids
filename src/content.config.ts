import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORY_VALUES } from "./lib/categories";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/posts",
    generateId: ({ entry }) =>
      entry.replace(/\/index\.\w+$/, "").replace(/\.\w+$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200).default(""),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(CATEGORY_VALUES),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      thumb: image(),
      thumbAlt: z.string().default(""),
      cover: image().optional(),
      coverAlt: z.string().default(""),
    }),
});

export const collections = { posts };