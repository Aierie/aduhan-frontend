import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import ComplaintIconImage from "./ComplaintIconImage/index.js";
import { defaultMapStyle, highlightLayerIndex } from "./mapStyle.js";

export default class BaseMap extends Component {
  //#notetake - current use of ReactMapGL appears to require absolute width and height
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        width: this.props.width,
        height: this.props.height,
        latitude: 3.139003,
        longitude: 101.686852,
        zoom: 11,
        bearing: 0,
        pitch: 0
      }
    };
    this.bounds = {
      minLongitude: 100.65,
      maxLongitude: 102.73,
      minLatitude: 2.149,
      maxLatitude: 4.153,
      maxZoom: 15.5,
      minZoom: 10
    };
    this.onViewportChange = this.onViewportChange.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.highlightAreas = this.highlightAreas.bind(this);
    this.clearHighlights = this.clearHighlights.bind(this);
  }

  componentDidMount() {
    this.highlightAreas(this.props.highlightedAreas);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (prevProps.highlightedAreas !== this.props.highlightedAreas)
      this.highlightAreas(this.props.highlightedAreas);
  }

  highlightAreas = locationNames => {
    this.setState({
      mapStyle: defaultMapStyle.setIn(
        ["layers", highlightLayerIndex, "filter"],
        ["in", "Nama", ...locationNames]
      )
    });
  };

  /*toggleHighlight = locationName => {
    let current = this.state.mapStyle.layers[highlightLayerIndex]["filter"];
    if (current.includes(locationName)) {
      current.splice(current.indexOf("locationName"), 1);
    } else {
      current.push(locationName);
    }

    this.setState({ mapStyle: { layers: current } });
  };*/

  clearHighlights = locationNames => {
    this.setState({
      mapStyle: defaultMapStyle.setIn(
        ["layers", highlightLayerIndex, "filter"],
        ["in", "Nama", ""]
      )
    });
  };

  //todo - highlight single area, connect to filter state.

  renderMarker = (complaint, index) => {
    const { setPreviewedId, previewedId, setSelectedId } = this.props;
    return (
      <ComplaintMarker
        complaint={complaint}
        setPreviewedId={setPreviewedId}
        setSelectedId={setSelectedId}
        previewed={complaint.id === previewedId ? true : false}
        key={index}
      />
    );
  };

  onViewportChange = viewport => {
    //setting limits on zoom and pan
    let setWithinBounds = (val, min, max) => {
      if (val <= min) return min;
      else if (val >= max) return max;
      return val;
    };
    const {
      minLatitude,
      maxLatitude,
      minLongitude,
      maxLongitude,
      minZoom,
      maxZoom
    } = this.bounds;
    const { latitude, longitude, zoom } = viewport;
    viewport.latitude = setWithinBounds(latitude, minLatitude, maxLatitude);
    viewport.longitude = setWithinBounds(longitude, minLongitude, maxLongitude);
    viewport.zoom = setWithinBounds(zoom, minZoom, maxZoom);
    this.setState({ viewport });
  };

  render() {
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        mapStyle={this.state.mapStyle}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken=""
      >
        {this.props.complaintsList.map(this.renderMarker)}
      </ReactMapGL>
    );
  }
}

class ComplaintMarker extends Component {
  render() {
    const { complaint, setPreviewedId, setSelectedId, previewed } = this.props;
    return (
      <Marker latitude={complaint.latitude} longitude={complaint.longitude}>
        <ComplaintIconImage
          type={complaint.type}
          complaintId={complaint.id}
          setPreviewedId={setPreviewedId}
          previewed={previewed}
          setSelectedId={setSelectedId}
        />
      </Marker>
    );
  }
}
