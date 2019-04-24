import React, { Component } from "react";
import { GridList } from "@rmwc/grid-list";
import ComplaintTile from "./ComplaintTile/index.js";
import "@material/grid-list/dist/mdc.grid-list.css";

class ComplaintGrid extends Component {
  constructor(props) {
    super(props);
    this._renderComplaintTile = this._renderComplaintTile.bind(this);
  }

  _renderComplaintTile = complaintDetails => {
    return (
      /*todo add onclick*/
      <ComplaintTile
        key={complaintDetails.id}
        complaintId={complaintDetails.id}
        complaintImage={complaintDetails.image}
        complaintTitle={complaintDetails.title}
        complaintBriefDescription={complaintDetails.description}
        setPreviewedId={this.props.setPreviewedId}
        previewed={
          this.props.previewedId === complaintDetails.id ? true : false
        }
        setSelectedId={this.props.setSelectedId}
      />
    );
  };

  render() {
    return (
      <GridList>
        {this.props.complaintsList.map(this._renderComplaintTile)}
      </GridList>
    );
  }
}

export default ComplaintGrid;
