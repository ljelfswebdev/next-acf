// templates/postTypes/news.js

export const NEWS_POST_TEMPLATE = [
  {
    key: 'banner',
    label: 'Banner Section',
    fields: [
      { name: 'bannerTitle', label: 'Banner Title', type: 'text' },
      { name: 'bannerImage', label: 'Banner Image', type: 'image' },
    ],
  },

  {
    key: 'intro',
    label: 'Intro Text + Image',
    fields: [
      { name: 'introText', label: 'Intro Text', type: 'textarea' },
      { name: 'introImage', label: 'Intro Image', type: 'image' },
    ],
  },

  {
    key: 'main',
    label: 'Main Content',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Body', type: 'rich' },
      { name: 'featuredImage', label: 'Featured Image', type: 'image' },

      // ✅ Category checkboxes
      { name: 'isKirby',   label: 'Kirby',   type: 'checkbox' },
      { name: 'isDyson',   label: 'Dyson',   type: 'checkbox' },
      { name: 'isSpares',  label: 'Spares',  type: 'checkbox' },
      { name: 'isVacuum',  label: 'Vacuum',  type: 'checkbox' },
      { name: 'isService', label: 'Service', type: 'checkbox' },
      { name: 'isGeneral', label: 'General', type: 'checkbox' },
    ],
  },

  // ✅ Flexible content-style repeater for content blocks
  {
    key: 'blocks',
    label: 'Content Blocks',
    fields: [
      {
        name: 'blocks',
        label: 'Blocks',
        type: 'repeater',
        of: [
          {
            name: 'blockType',
            label: 'Block Type',
            type: 'select',            // you’ll render this as a select in FieldBuilder
            options: [
              'imageGallery',          // Image Gallery
              'richText',              // Rich Text
            ],
          },
          {
            name: 'gallery',
            label: 'Gallery Images',
            type: 'repeater',
            of: [
              {
                name: 'image',
                label: 'Image',
                type: 'image',
              },
            ],
          },
          {
            name: 'content',
            label: 'Rich Text Content',
            type: 'rich',
          },
        ],
      },
    ],
  },
];