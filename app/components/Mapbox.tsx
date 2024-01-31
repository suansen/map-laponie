"use client"

import React, { Fragment, useState } from "react"
import Map, {
  GeolocateControl,
  Layer,
  Marker,
  Popup,
  ScaleControl,
  Source
} from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { IoHome } from "react-icons/io5"
import GeocoderControl from "./GeocoderControl"
import useScreenSize from "../hooks/useScreenSize"
import { getDistance } from "geolib"
import { metersToPixelsAtMaxZoom } from "../utils/metersToPixelsAtMaxZoom"
import { CustomerType } from "@/typings"

interface SearchMarker {
  longitude: number
  latitude: number
}

// interface FeatureType {
//   type: "Feature"
//   properties: {}
//   geometry: {
//     type: "Point"
//     coordinates: [number, number]
//   }
// }

type Props = {
  customers: CustomerType[]
}

const Mapbox = ({ customers }: Props) => {
  const screenSize = useScreenSize()
  const mapStyle = "mapbox://styles/suansen88/cl3dtrhmk000214m066u9h47x"
  const [searchMarkerInfo, setSearchMarkerInfo] = useState<SearchMarker>({
    longitude: 103.86191236577002,
    latitude: 1.309917528787238
  })
  const [viewState, setViewState] = useState({
    longitude: 103.86191236577002,
    latitude: 1.309917528787238,
    zoom: 12
  })
  const [popupInfo, setPopupInfo] = useState<CustomerType>(null)
  // const [featuresArray, setFeaturesArray] = useState<FeatureType[]>([
  //   {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "Point",
  //       coordinates: [103.86191236577002, 1.309917528787238]
  //     }
  //   }
  // ])

  // useEffect(() => {
  //   setFeaturesArray([
  //     {
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         type: "Point",
  //         coordinates: [103.86191236577002, 1.309917528787238]
  //       }
  //     }
  //   ])
  //   customers.forEach((customer) => {
  //     if (customer?.customAddress) {
  //       setFeaturesArray((prev) => [
  //         ...prev,
  //         {
  //           type: "Feature",
  //           properties: {},
  //           geometry: {
  //             type: "Point",
  //             coordinates: [
  //               +customer?.customAddress?.longitude,
  //               +customer?.customAddress?.latitude
  //             ]
  //           }
  //         }
  //       ])
  //     }
  //   })
  // }, [customers])

  // const pins = useMemo(
  //   () =>
  //     customers.map((customer, index) => (
  //       <Fragment key={`marker-${index}`}>
  //         <Source
  //           type="geojson"
  //           data={{
  //             type: "Feature",
  //             properties: {},
  //             geometry: {
  //               type: "Point",
  //               coordinates: [
  //                 +customer?.customAddress.longitude!,
  //                 +customer?.customAddress.latitude!
  //               ]
  //             }
  //           }}
  //         >
  //           <Layer
  //             {...metersToPixelsAtMaxZoom({
  //               meters: 3000,
  //               latitude: +customer?.customAddress.latitude!,
  //               color: customer?.selectedColor.value
  //             })}
  //           />
  //         </Source>
  //         <Marker
  //           longitude={+customer?.customAddress.longitude!}
  //           latitude={+customer?.customAddress.latitude!}
  //           anchor="center"
  //           color={customer?.selectedColor.value}
  //           onClick={(e) => {
  //             // If we let the click event propagates to the map, it will immediately close the popup
  //             // with `closeOnClick: true`
  //             e.originalEvent.stopPropagation()
  //             setPopupInfo(customer)
  //           }}
  //         />
  //       </Fragment>
  //     )),
  //   [customers]
  // )

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
        <Source
          type="geojson"
          data={{
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [
                searchMarkerInfo.longitude!,
                searchMarkerInfo.latitude!
              ]
            }
          }}
        >
          <Layer
            {...metersToPixelsAtMaxZoom({
              meters: 1000,
              latitude: searchMarkerInfo.latitude!
              // color: customer?.selectedColor.value
            })}
          />
        </Source>
        {/* <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: featuresArray
          }}
        >
          <Layer
            {...metersToPixelsAtMaxZoom({
              meters: 1500,
              latitude: 1.309917528787238,
              color: "#3b82f6"
            })}
          />
          {customers.map((customer, index) => (
            <Fragment key={`layer-${customer?.name}${index}`}>
              <Layer
                {...metersToPixelsAtMaxZoom({
                  meters: 1500,
                  latitude: +customer?.customAddress.latitude!,
                  color: customer?.selectedColor.value
                })}
              />
            </Fragment>
          ))}
        </Source> */}
        <Marker
          longitude={103.86191236577002}
          latitude={1.309917528787238}
          anchor="center"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            setPopupInfo({
              selectedColor: { value: "" },
              customAddress: {
                _type: "customAddress",
                addressName: "322C king George’s Ave",
                longitude: "103.86191236577002",
                latitude: "1.309917528787238",
                postalCode: "208565"
              },
              name: "Laponie"
            })
          }}
        >
          <div className=" text-white rounded-full bg-[#A99080] shadow-sm w-10 h-10 flex justify-center items-center">
            <IoHome size={20} />
          </div>
        </Marker>

        {/* {pins} */}
        {customers.map((customer, index) => (
          <Fragment key={`marker-${index}`}>
            <Marker
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
          </Fragment>
        ))}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo?.customAddress?.longitude)}
            latitude={Number(popupInfo?.customAddress?.latitude)}
            onClose={() => setPopupInfo(null)}
            className=" md:min-w-72 overflow-hidden"
          >
            <div className="text-black p-4">
              <div className="font-semibold pb-2">{popupInfo.name}</div>
              <div className="grid grid-cols-5 gap-x-4 text-black/60">
                <div className=" col-span-2">Address:</div>
                <div className=" col-span-3">
                  {popupInfo.customAddress.addressName}
                </div>
                <div className=" col-span-2">Postal Code:</div>
                <div className=" col-span-3">
                  {popupInfo.customAddress.postalCode}
                </div>
                {/* <div className=" col-span-2">Longitude:</div> */}
                {/* <div className=" col-span-3"> */}
                {/* {popupInfo.customAddress.longitude} */}
                {/* </div> */}
                {/* <div className=" col-span-2">Latitude:</div> */}
                {/* <div className=" col-span-3"> */}
                {/* {popupInfo.customAddress.latitude} */}
                {/* </div> */}
                <div className=" col-span-2">Distance: </div>
                <div className=" col-span-3">
                  {getDistance(
                    {
                      longitude: searchMarkerInfo?.longitude,
                      latitude: searchMarkerInfo?.latitude
                    },
                    {
                      longitude: popupInfo.customAddress.longitude,
                      latitude: popupInfo.customAddress.latitude
                    }
                  ) / 1000}{" "}
                  km
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {popupInfo.brands?.map((brand, index) => (
                  <div key={`${brand.name}${index}`}>{brand.name}</div>
                ))}
              </div>
            </div>
          </Popup>
        )}
      </Map>
      <div className="bg-black/50 text-white p-2 absolute bottom-16 lg:top-0 left-1/2 -translate-x-1/2 z-10 rounded-lg flex flex-col lg:flex-row gap-2 h-fit">
        <div>
          <strong>Longitude: </strong>
          {searchMarkerInfo?.longitude}
        </div>
        <div>
          <strong>Latitude: </strong>
          {searchMarkerInfo?.latitude}
        </div>
      </div>
    </div>
  )
}

export default Mapbox
