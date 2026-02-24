import { defineField, defineType } from 'sanity';

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Communication', value: 'Communication' },
          { title: 'Digital', value: 'Digital' },
          { title: 'Installation', value: 'Installation' },
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Anno',
      type: 'string',
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrizione',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'video',
      title: 'URL Video (Vimeo)',
      type: 'url',
    }),
    defineField({
      name: 'videoThumb',
      title: 'Thumbnail Video',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'active',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'legacyId',
      title: 'ID Originale (migrazione)',
      type: 'number',
      description: 'ID numerico dal file JSON originale, usato solo per la migrazione.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'videoThumb',
    },
  },
  orderings: [
    {
      title: 'ID Originale (decrescente)',
      name: 'legacyIdDesc',
      by: [{ field: 'legacyId', direction: 'desc' }],
    },
    {
      title: 'Anno (decrescente)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});
