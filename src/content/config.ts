import { defineCollection, z } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      description: z.string(),
      hero_image: z.string(),
      hero_video: z.string().optional(),
      prep_time: z.string(),
      cook_time: z.string(),
      total_time: z.string(),
      servings: z.number().default(4),
      scaling_type: z.enum(['linear', 'discrete', 'fixed']).default('linear'),
      ingredients: z.array(
        z.object({
          name: z.string(),
          amount: z.number(),
          unit: z.string(),
          notes: z.string().optional(),
        })
      ),
      instructions: z.array(
        z.object({
          step: z.number(),
          name: z.string().optional(),
          text: z.string(),
          image: z.string().optional(),
        })
      ),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      diet: z.array(z.string()).default([]),
      model_asset: z.string().optional(),
      model_interaction_type: z
        .enum(['exploded', 'cross_section', 'scaling', 'composer', 'none'])
        .default('none'),
      nutrition: z
        .object({
          calories: z.string().optional(),
          carbohydrates: z.string().optional(),
          protein: z.string().optional(),
          fat: z.string().optional(),
          fiber: z.string().optional(),
        })
        .optional(),
      author: z.string().default('Badr'),
      published_date: z.string(),
      updated_date: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero_image: z.string(),
    author: z.string().default('Badr'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    published_date: z.string(),
    updated_date: z.string().optional(),
  }),
});

export const collections = {
  recipes: recipesCollection,
  blog: blogCollection,
};
