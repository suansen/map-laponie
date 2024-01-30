export type CustomerType = {
  selectedColor: { value: string }
  brands?: { name: string }[]
  customAddress: {
    _type: string
    addressName: string
    longitude: string
    latitude: string
    postalCode: string
  }
  name: string
} | null
