import { CircleLayer } from "mapbox-gl"

type Props = {
  meters: number
  latitude: number
  color?: string
}

export const metersToPixelsAtMaxZoom = ({
  meters,
  latitude,
  color = "#007cbf"
}: Props) => {
  const layerStyle: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": {
        stops: [
          [0, 0],
          [20, meters / 0.075 / Math.cos((latitude * Math.PI) / 180)]
        ],
        base: 2
      },
      "circle-color": color,
      "circle-opacity": 0.2
    }
  }

  return layerStyle
}
