import React, { PureComponent } from "react";
import { Icon } from "@rmwc/icon";

class ComplaintIconImage extends PureComponent {
  constructor(props) {
    super(props);
    this.setIconImage = this.setIconImage.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  setIconImage = () => {
    //should be based on kind of issue
    let color;
    if (this.props.previewed) {
      color = "red";
    } else {
      switch (this.props.type) {
        case "f":
          color = "#007BA7";
          break;
        case "l":
          color = "teal";
          break;
        case "a":
          color = "#B2FFFF";
          break;
        case "g":
          color = "green";
          break;
        default:
          color = "white";
          break;
      }
    }
    return (
      <div
        style={{
          background: color,
          width: this.props.previewed ? "12px" : "10px",
          height: this.props.previewed ? "12px" : "10px",
          borderRadius: "100px"
        }}
      />
    );
  };

  _onMouseEnter = () => {
    this.props.setPreviewedId(this.props.complaintId);
  };

  _onMouseLeave = () => {
    this.props.setPreviewedId(null);
  };

  _onClick = () => {
    this.props.setSelectedId(this.props.complaintId);
  };

  render() {
    return (
      <Icon
        onClick={this._onClick}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        icon={this.setIconImage()}
      />
    );
  }
}
export default ComplaintIconImage;
