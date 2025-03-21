import { type SchemaTypeDefinition } from 'sanity'
import Watch from './Watch'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Watch,order],
}
