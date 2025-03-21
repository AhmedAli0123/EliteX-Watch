import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,Apitoken } from '../env'

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion:apiVersion,
  token:Apitoken,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})