import { defineField, defineType } from 'sanity';

/** Tipo oggetto per il video di un work (url Vimeo + poster) */
export const videoObjectSchema = defineType({
  name: 'videoObject',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({ name: 'url', title: 'URL Video (Vimeo)', type: 'url' }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});

/** Tipo oggetto per una singola immagine della galleria */
export const galleryImageObjectSchema = defineType({
  name: 'galleryImageObject',
  title: 'Immagine galleria',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});

export const workSchema = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string' }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'client',
      title: 'Clienti',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'client' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Immagine principale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoObject',
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria',
      type: 'array',
      of: [{ type: 'galleryImageObject' }],
    }),
    defineField({ name: 'year', title: 'Anno', type: 'number' }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover',
    },
  },
});
