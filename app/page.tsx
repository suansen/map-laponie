import { groq } from "next-sanity"
import { sanityClient } from "./utils/sanity/client"
// import MapSection from "./components/Map"

// import Image from "next/image"
const queries = {
  pages: groq`*[_type == "customer"]{
  _type,
  name,
  customAddress
}`
}

export default async function Home() {
  const customers = await sanityClient.fetch(queries.pages, {
    cache: "no-store"
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="underline">Test</h2>
      {/* <MapSection /> */}
      <div>{JSON.stringify(customers)}</div>
    </main>
  )
}
