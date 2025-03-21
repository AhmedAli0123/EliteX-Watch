import {defineType, defineField} from 'sanity';

const watchSchema = defineType({
  name: "watch",
  title: "Watches",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Watch Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Men's Watch", value: "mens" },
          { title: "Ladies Watch", value: "ladies" },
          { title: "Smart Watch", value: "smart" },
          { title: "Sport Watch", value: "sport" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Enable this for featured products"
    },
    defineField({
      name: "image",
      title: "Watch Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    
    
  ],
});
export default watchSchema;