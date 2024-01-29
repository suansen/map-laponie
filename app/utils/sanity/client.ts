// ./src/utils/sanity/client.ts
import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { UseNextSanityImageDimensions } from "next-sanity-image"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

// const config = {
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   useCdn: process.env.NODE_ENV === "production",
//   apiVersion: "2021-10-21"
// }

type ImageOptionsType = {
  width: number | null
  originalImageDimensions: UseNextSanityImageDimensions
  croppedImageDimensions: UseNextSanityImageDimensions
  quality: number | null
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
})

const builder = imageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "" // Provide a default value for dataset
})

export const imageSanityURLBuilder = (
  imageUrlBuilder: any,
  options: ImageOptionsType
) => {
  return imageUrlBuilder.width(
    options.width || Math.min(options.originalImageDimensions.width, 800)
  )
  // .blur(20)
  // .flipHorizontal()
  // .saturation(-100)
  // .fit("clip")
}

// export const fileUrl = (source: any) => fileBuilder.file(source)
export const urlFor = (source: any) => builder.image(source)
