import MAP_STYLE from "./map-style-basic-v8.json";
import { fromJS } from "immutable";

const mapStyle = {
  ...MAP_STYLE,
  sources: { ...MAP_STYLE.sources },
  layers: MAP_STYLE.layers.slice()
};

mapStyle.layers.splice(
  mapStyle.layers.findIndex(entry => /label/.test(entry.id)),
  0,
  {
    id: "DUN",
    type: "line",
    source: "DUNs",
    "source-layer": "DUN_boundaries_KL_2015",
    paint: {
      "line-color": "#154360",
      "line-opacity": 0.8,
      "line-blur": 4
    }
  },
  {
    id: "DUN-highlighted",
    type: "fill",
    source: "DUNs",
    "source-layer": "DUN_boundaries_KL_2015",
    paint: {
      "fill-outline-color": "#1B4F72",
      "fill-color": "#85C1E9",
      "fill-opacity": 0.6
    },
    filter: ["in", "Nama", ""]
  }
);

export const highlightLayerIndex = mapStyle.layers.findIndex(
  entry => entry.id === "DUN-highlighted"
);

export const defaultMapStyle = fromJS(mapStyle);
