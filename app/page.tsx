import { QueryParams, groq } from "next-sanity"
import { sanityClient } from "./utils/sanity/client"
// import MapSection from "./components/Map"
import Mapbox from "./components/Mapbox"
import { CustomerType } from "@/typings"

// import Image from "next/image"
const queries = {
  pages: groq`*[_type == "customer"]{
  selectedColor->{value},
  brands[]->{name},
  customAddress,
  name
}`
}

export default async function Home() {
  const customers = await sanityClient.fetch<CustomerType[]>(
    queries.pages,
    {},
    {
      next: { revalidate: 30 }
    }
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      {/* <h2 className="underline">Test</h2> */}
      <Mapbox customers={customers} />
      {/* <div className="absolute bottom-4 p-8 bg-black/50">
        {JSON.stringify(customers)}
      </div> */}
    </main>
  )
}
