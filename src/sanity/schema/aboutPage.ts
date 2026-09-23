import { defineField, defineType } from 'sanity';

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Testo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
