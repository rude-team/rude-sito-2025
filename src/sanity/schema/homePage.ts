import { defineField, defineType } from 'sanity';

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'leftText',
      title: 'Testo sinistro',
      type: 'string',
    }),
    defineField({
      name: 'rightText',
      title: 'Testo destro',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Immagine centrale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL Video (Vimeo)',
      type: 'url',
      description: 'Link al video che si apre cliccando sull\'immagine centrale',
    }),
  ],
});
