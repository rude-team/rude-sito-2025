import { defineField, defineType } from 'sanity';

export const workPageSchema = defineType({
  name: 'workPage',
  title: 'Work (ordine)',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Progetti (ordine visuale)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'work' }] }],
    }),
  ],
});
