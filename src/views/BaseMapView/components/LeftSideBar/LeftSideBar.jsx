import React, { Component } from "react";
import { TabBar, Tab } from "@rmwc/tabs";
import Scroller from "react-scrollbars-custom";
import { Button } from "@rmwc/button";
import Info from "./Info/index.js";
import FilterList from "./FilterList/index.js";
//import DateFilter from "../DateFilter/index.js";
import "@material/tab-bar/dist/mdc.tab-bar.css";
import "@material/tab/dist/mdc.tab.css";
import "@material/tab-scroller/dist/mdc.tab-scroller.css";
import "@material/tab-indicator/dist/mdc.tab-indicator.css";
import "@material/button/dist/mdc.button.css";

const typeDict = {
  f: "Facility",
  l: "Legal",
  a: "Accessibility",
  g: "General"
};
//#notetake - using a constant outside of the object's scope will preserve state even if the rerendered object doesn't reflect it (checkboxes unticked but builtfilter is still the same)
/*const builtFilters = {
  type: [],
  locationName: []
};*/

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Information"
    };
    this._renderPageContent = this._renderPageContent.bind(this);
  }

  mapType = t => {
    return typeDict[t];
  };

  _renderPageContent = () => {
    if (this.state.page === "Information") {
      return (
        <Scroller style={{ width: 300, height: 550, minHeight: 300 }}>
          <div
            align="center"
            style={{ display: "flex", padding: "0px 5px 0px 5px" }}
          >
            {this.props.selected && <Info complaint={this.props.selected} />}
          </div>
        </Scroller>
      );
    } else if (this.state.page === "Filters") {
      const {
        filters,
        filterItemToggle,
        getBuiltFilterState,
        returnBuiltFilters,
        toggleSelectAllFilters,
        getSelectAllToggle
      } = this.props;
      return (
        <div>
          <Scroller
            style={{
              width: 300,
              height: 500,
              minHeight: 300
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <FilterList
                boxes={filters.type}
                mapFunction={this.mapType}
                getBuiltFilterState={label =>
                  getBuiltFilterState(label, "type")
                }
                getSelectAllToggle={() => getSelectAllToggle("type")}
                toggleSelectAllFilters={() => toggleSelectAllFilters("type")}
                toggleFilter={filterItemToggle("type")}
                title="Complaint Type"
              />
              <FilterList
                boxes={filters.locationName}
                getBuiltFilterState={label =>
                  getBuiltFilterState(label, "locationName")
                }
                getSelectAllToggle={() => getSelectAllToggle("locationName")}
                toggleSelectAllFilters={() =>
                  toggleSelectAllFilters("locationName")
                }
                toggleFilter={filterItemToggle("locationName")}
                title="Constituency"
              />
              {/*<DateFilter />*/}
            </div>
          </Scroller>
          <Button onClick={returnBuiltFilters}>SET FILTERS</Button>
        </div>
      );
    }
  };

  //TODO: Use reducer to replace tab onclick
  render() {
    return (
      <div style={{ width: 300, height: 600, float: "left" }}>
        <TabBar style={{ padding: "0px 5px 0px 5px" }}>
          <Tab onClick={() => this.setState({ page: "Information" })}>
            Information
          </Tab>
          <Tab onClick={() => this.setState({ page: "Filters" })}>Filters</Tab>
        </TabBar>
        {this._renderPageContent()}
      </div>
    );
  }
}

export default LeftSideBar;
