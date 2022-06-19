import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

const supportedLanguages = [
  { id: 'ru', title: 'Russian', isDefault: true },
  { id: 'pl', title: 'Polish' }
];
const baseLanguage = supportedLanguages.find((l) => l.isDefault);

const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: false }
    }
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: 'translations'
  }))
};

const localePortableText = {
  title: 'Localized portable text',
  name: 'localePortableText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: false }
    }
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'portableText',
    fieldset: 'translations'
  }))
};

const authorSchema = {
  name: "author",
  title: "Author",
  description: "Info, short bio and contacts",
  type: "document",
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
  fields: [
    {
      name: "title",
      title: "Title",
      validation: (Rule) => Rule.required(),
      type: "localeString",
    },
    {
      name: "slug",
      title: "slug",
      validation: (Rule) => Rule.required(),
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "picture",
      title: "Picture",
      validation: (Rule) => Rule.required(),
      type: "image",
    },
    {
      name: "bio",
      title: "Bio",
      type: "localePortableText",
    },
    {
      name: "email",
      title: "Email",
      validation: (Rule) => Rule.required(),
      type: "string",
    },
    {
      name: "twitter",
      title: "Twitter",
      validation: (Rule) => Rule.required(),
      type: "string",
    },
    {
      name: "social",
      title: "Social",
      type: "array",
      of: [
        {
          type: "string",
          options: {},
        },
      ],
    },
  ],
};


const pageSchema = {
  name: 'page',
  title: 'Page',
  description: 'Standalone page (e.g. About page)',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'title'
      }
    },
        {
      name: 'picture',
      title: 'Picture',
      validation: (Rule) => Rule.required(),
      type: 'image'
    },
    {
      name: 'text',
      title: 'Text',
      type: 'localePortableText'
    }
  ]
};

const postSchema = {
  name: 'post',
  title: 'Post',
  description: 'Blog post.',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      validation: (Rule) => Rule.required(),
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean'
    },
    {
      name: 'author',
      title: 'Author',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [
        {
          type: 'author'
        }
      ],
      options: {
        disableNew: true
      }
    },
    {
      name: 'text',
      title: 'Post text',
      type: 'localePortableText'
    },
    {
      name: 'tags',
      title: 'Tags',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'tag'
            }
          ]
        }
      ],
      options: {
        disableNew: true
      }
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'post'
            }
          ]
        }
      ]
    }
  ]
};

const portableTextSchema = {
  name: 'portableText',
  type: 'array',
  title: 'Rich text',
  of: [
    {
      type: 'block',
      of: [
        {
          type: 'image'
        },
      ],
      styles: [
        {
          title: 'Normal text',
          value: 'normal'
        },
        {
          title: 'Heading 1',
          value: 'h1'
        },
        {
          title: 'Heading 2',
          value: 'h2'
        },
        {
          title: 'Heading 3',
          value: 'h3'
        },
        {
          title: 'Heading 4',
          value: 'h4'
        },
        {
          title: 'Heading 5',
          value: 'h5'
        },
        {
          title: 'Heading 6',
          value: 'h6'
        },
        {
          title: 'Quote',
          value: 'blockquote'
        }
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          },
          {
            type: 'image'
          },
        ]
      }
    },
    {
      type: 'image'
    },
  ]
};

const tagSchema = {
  name: 'tag',
  title: 'Tag',
  description: 'Tagged content is easy to sort and filter',
  type: 'document',
  preview: {
    select: {
      title: `title.${baseLanguage.id}`
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'picture',
      title: 'Picture',
      validation: (Rule) => Rule.required(),
      type: 'image',
            options: {
        hotspot: true
      },
    },
    {
      name: 'text',
      title: 'Text',
      validation: (Rule) => Rule.required(),
      type: 'localePortableText'
    }
  ]
};

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    portableTextSchema,
    postSchema,
    authorSchema,
    tagSchema,
    pageSchema,
    localeString,
    localePortableText
  ])
});
