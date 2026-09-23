import { defineField, defineType } from 'sanity';

export const clientSchema = defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string' }),
    defineField({ name: 'website', title: 'Sito web', type: 'url' }),
  ],
});
