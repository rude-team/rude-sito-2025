import { defineField, defineType } from 'sanity';

/** Tipo oggetto per un singolo social nel footer */
export const footerSocialObjectSchema = defineType({
  name: 'footerSocialObject',
  title: 'Social',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icona',
      type: 'image',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'URL o mailto:indirizzo@email.com',
    }),
  ],
});

export const footerSchema = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({ name: 'address', title: 'Indirizzo', type: 'string' }),
    defineField({
      name: 'socials',
      title: 'Social',
      type: 'array',
      of: [{ type: 'footerSocialObject' }],
    }),
  ],
});
