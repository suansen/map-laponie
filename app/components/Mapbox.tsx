"use client"

import React, { useMemo, useState } from "react"
import Map, {
  GeolocateControl,
  Marker,
  Popup,
  ScaleControl
} from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { IoHome } from "react-icons/io5"
import GeocoderControl from "./GeocoderControl"
import useScreenSize from "../hooks/useScreenSize"

interface SearchMarker {
  longitude: number
  latitude: number
}

type CustomerType = {
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

type Props = {
  customers: CustomerType[]
}

const Mapbox = ({ customers }: Props) => {
  const screenSize = useScreenSize()
  const mapStyle = "mapbox://styles/suansen88/cl3dtrhmk000214m066u9h47x"
  const [searchMarkerInfo, setSearchMarkerInfo] = useState<SearchMarker>({
    longitude: 0.0,
    latitude: 0.0
  })
  const [viewState, setViewState] = useState({
    longitude: 103.86191236577002,
    latitude: 1.309917528787238,
    zoom: 16
  })
  const [popupInfo, setPopupInfo] = useState<CustomerType>(null)

  const pins = useMemo(
    () =>
      customers.map((customer, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={+customer?.customAddress.longitude!}
          latitude={+customer?.customAddress.latitude!}
          anchor="center"
          color={customer?.selectedColor.value}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            setPopupInfo(customer)
          }}
        />
      )),
    [customers]
  )

  return (
    <div className="relative">
      <Map
        {...viewState}
        onMove={(evt: any) => setViewState(evt.viewState)}
        mapStyle={mapStyle}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        attributionControl={false}
      >
        <GeocoderControl
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
          position="top-right"
          setSearchMarkerInfo={setSearchMarkerInfo}
        />
        <GeolocateControl position="top-left" />
        <ScaleControl unit="metric" maxWidth={screenSize.width} />
        <Marker
          longitude={103.86191236577002}
          latitude={1.309917528787238}
          anchor="center"
        >
          <div className=" text-white rounded-full bg-[#A99080] shadow-sm w-10 h-10 flex justify-center items-center">
            <IoHome size={20} />
          </div>
        </Marker>
        {pins}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo?.customAddress?.longitude)}
            latitude={Number(popupInfo?.customAddress?.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div className="text-black p-4">
              <div className="font-semibold pb-2">{popupInfo.name}</div>
              <div className="grid grid-cols-2 gap-x-4 text-black/60">
                <div>Address:</div>
                <div>{popupInfo.customAddress.addressName}</div>
                <div>Postal Code:</div>
                <div>{popupInfo.customAddress.postalCode}</div>
                <div>Longitude:</div>
                <div>{popupInfo.customAddress.longitude}</div>
                <div>Latitude:</div>
                <div>{popupInfo.customAddress.latitude}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {popupInfo.brands?.map((brand, index) => (
                  <div key={`${brand.name}${index}`}>{brand.name}</div>
                ))}
              </div>
              {/* {turf.distance(
                turf.point([
                  searchMarkerInfo?.longitude,
                  searchMarkerInfo?.latitude
                ]),
                turf.point([
                  popupInfo.customAddress.longitude,
                  popupInfo.customAddress.latitude
                ])
              )} */}
            </div>
          </Popup>
        )}
      </Map>
      <div className="bg-black/50 p-2 absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-lg">
        Longitude: {searchMarkerInfo?.longitude} Latitude:{" "}
        {searchMarkerInfo?.latitude}{" "}
      </div>
    </div>
  )
}

export default Mapbox
