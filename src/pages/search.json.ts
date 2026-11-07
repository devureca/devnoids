import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { getPublishedPosts } from "../lib/posts";
import { categoryLabel } from "../lib/categories";
import { isoDay } from "../lib/format";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const items = await Promise.all(
    posts.map(async (post) => {
      const [thumb, tiny] = await Promise.all([
        getImage({ src: post.data.thumb, width: 480, format: "webp" }),
        getImage({
          src: post.data.thumb,
          width: 32,
          format: "webp",
          quality: 30,
        }),
      ]);

      return {
        id: post.id,
        title: post.data.title,
        description: post.data.description,
        date: isoDay(post.data.date),
        category: categoryLabel(post.data.category),
        tags: post.data.tags,
        alt: post.data.thumbAlt || post.data.title,
        thumb: thumb.src,
        tiny: tiny.src,
      };
    }),
  );

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};