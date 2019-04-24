import React, { Component } from "react";
import {
  GridTile,
  GridTilePrimary,
  GridTilePrimaryContent
} from "@rmwc/grid-list";
import { Typography } from "@rmwc/typography";
import "@material/grid-list/dist/mdc.grid-list.css";

class ComplaintTile extends Component {
  constructor(props) {
    super(props);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
  }

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
      /*todo ensure font size appropriate */
      <div
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
        style={{
          padding: this.props.previewed ? "8px 0px 0px 0px" : "10px 2px 2px 2px"
        }}
      >
        <GridTile style={{ width: 135 }} key={this.props.key}>
          <GridTilePrimary>
            <GridTilePrimaryContent
              src={this.props.complaintImage}
              width="100"
              height="100"
            />
          </GridTilePrimary>
        </GridTile>
        <div style={{ width: 130 }}>
          <Typography use="subtitle2">{this.props.complaintTitle}</Typography>
        </div>
      </div>
    );
  }
}

export default ComplaintTile;
