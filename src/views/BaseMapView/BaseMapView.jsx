//dependency imports
import React, { Component } from "react";
import Scroller from "react-scrollbars-custom";
import { Tab, TabBar } from "@rmwc/tabs";

//local imports
import LeftSideBar from "./components/LeftSideBar/LeftSideBar.jsx";
import ComplaintGrid from "./components/ComplaintGrid/index.js";
import BaseMap from "./components/BaseMap/index.js";

//data and styling
import generatedComplaints from "../../../data/features.json";
import "@material/tab-bar/dist/mdc.tab-bar.css";
import "@material/tab/dist/mdc.tab.css";
import "@material/tab-scroller/dist/mdc.tab-scroller.css";
import "@material/tab-indicator/dist/mdc.tab-indicator.css";

const getUniques = (ar, key) => {
  let unique = [];
  for (let entry of ar) {
    if (!unique.includes(entry[key])) {
      unique.push(entry[key]);
    }
  }
  return unique;
};

//primed for purposes of demo, should be collected live from data in real app
const initialTypeFilter = ["f", "l", "a", "g"];
export const initialLocationNameFilter = getUniques(
  generatedComplaints.generated.slice(0, 100),
  "Name"
);

class BaseMapView extends Component {
  constructor(props) {
    super(props);
    //TODO - come back and convert previewedId to a redux item
    this.state = {
      previewedId: null,
      selectedComplaint: null,
      filters: {
        locationName: initialLocationNameFilter,
        type: initialTypeFilter //getUniques(this.props.complaintsList, 'type')
      },
      selectAllToggle: {
        type: true,
        locationName: true
      }
    };
    //don't want changes to the built filter to force an update
    this.builtFilters = {
      type: [...initialTypeFilter],
      locationName: [...initialLocationNameFilter]
    };
    //#notetake - not all functions need to bind(this)
    this.setPreviewedId = this.setPreviewedId.bind(this);
    this.setSelectedComplaint = this.setSelectedComplaint.bind(this);
    this.getSelectedComplaint = this.getSelectedComplaint.bind(this);
    this.returnBuiltFilters = this.returnBuiltFilters.bind(this);
    this.getBuiltFilterState = this.getBuiltFilterState.bind(this);
    this.toggleSelectAllFilters = this.toggleSelectAllFilters.bind(this);
    this.getSelectAllToggle = this.getSelectAllToggle.bind(this);
  }

  getSelectAllToggle = filterType => this.state.selectAllToggle[filterType];

  toggleSelectAllFilters = filterType => {
    let status = !this.state.selectAllToggle[filterType];
    this.builtFilters[filterType] = status ? initialLocationNameFilter : [];
    this.setState({ selectAllToggle: status });
  };
  //this is passed down, but it carries a reference to the filters. Can we skip binding?
  //testing doesn't show any differences. the stored reference to builtFilters maybe?
  filterItemToggle = filterType => {
    const f = this.builtFilters[filterType];
    return item => {
      if (f.includes(item)) {
        f.splice(f.indexOf(item), 1);
      } else {
        f.push(item);
      }
      //for debug : console.log(this.builtFilters);
    };
  };

  //passed down so this has to be spcifically specified
  getBuiltFilterState = (label, type) => {
    return this.builtFilters[type].includes(label);
  };

  //ditto - perhaps refactor to setFiltersToBuilt
  returnBuiltFilters = () => {
    this.setState({ filters: this.builtFilters });
  };

  getSelectedComplaint = id => {
    let complaint = this.props.complaintsList.filter(
      complaint => complaint.id === id
    )[0];

    return complaint;
  };

  setSelectedComplaint = id => {
    this.setState({ selectedComplaint: this.getSelectedComplaint(id) });
  };

  setPreviewedId = id => {
    this.setState({ previewedId: id });
  };

  //note that previewedId, setPreviewedId, setSelectedId will need to be changed further done if redux is implemented.
  render() {
    const { previewedId, filters, selectedComplaint } = this.state;
    const filtered = this.props.complaintsList
      .filter(entry => {
        return filters.locationName.includes(entry.Name);
      })
      .filter(entry => {
        return filters.type.includes(entry.type);
      });

    return (
      <div style={{ width: 1200, height: 600 }} align="center">
        <LeftSideBar
          filters={{
            type: initialTypeFilter.slice(),
            locationName: initialLocationNameFilter.slice()
          }}
          getSelectAllToggle={this.getSelectAllToggle}
          toggleSelectAllFilters={this.toggleSelectAllFilters}
          filterItemToggle={this.filterItemToggle}
          getBuiltFilterState={this.getBuiltFilterState}
          returnBuiltFilters={this.returnBuiltFilters}
          selected={selectedComplaint}
        />
        <div style={{ width: 600, height: 600, float: "left" }} align="left">
          <BaseMap
            width={600}
            height={600}
            complaintsList={filtered}
            previewedId={previewedId}
            setPreviewedId={this.setPreviewedId}
            setSelectedId={this.setSelectedComplaint}
            highlightedAreas={filters.locationName.slice()}
          />
          {/*#notetake - prevProps in componentDidUpdate will do a shallow compare, slice returns a copy so that it doesn't see the reference being the same and dismiss it*/}
        </div>
        <div style={{ width: 300, height: 600, float: "left" }}>
          <TabBar>
            <Tab>Complaints</Tab>
          </TabBar>
          <Scroller style={{ width: 300, height: 500, minHeight: 550 }}>
            <ComplaintGrid
              complaintsList={filtered}
              setPreviewedId={this.setPreviewedId}
              previewedId={previewedId}
              setSelectedId={this.setSelectedComplaint}
            />
            {/*#notetake - possible optimisation w shouldComponentUpdate (setPreviewedId makes component lower down rerender?) */}
          </Scroller>
        </div>
      </div>
    );
  }
}

export default BaseMapView;
