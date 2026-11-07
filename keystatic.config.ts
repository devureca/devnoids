import { config, fields, collection } from "@keystatic/core";
import { CATEGORIES } from "./src/lib/categories";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        description: fields.text({
          label: "Descripción",
          multiline: true,
          validation: { length: { max: 200 } },
        }),
        date: fields.date({ label: "Fecha" }),
        category: fields.select({
          label: "Categoría",
          options: CATEGORIES.map(({ value, label }) => ({ value, label })),
          defaultValue: CATEGORIES[0].value,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: "Borrador", defaultValue: false }),
        thumb: fields.image({ label: "Miniatura" }),
        thumbAlt: fields.text({ label: "Texto alternativo miniatura" }),
        cover: fields.image({ label: "Portada" }),
        coverAlt: fields.text({ label: "Texto alternativo portada" }),
        content: fields.document({
          label: "Contenido",
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});