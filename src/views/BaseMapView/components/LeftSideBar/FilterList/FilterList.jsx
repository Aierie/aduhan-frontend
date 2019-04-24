import React, { Component } from "react";
import { CollapsibleList, SimpleListItem } from "@rmwc/list";
import { Typography } from "@rmwc/typography";
import { Checkbox } from "@rmwc/checkbox";
import "@material/list/dist/mdc.list.css";
import "@rmwc/list/collapsible-list.css";
import "@material/checkbox/dist/mdc.checkbox.css";

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
    this._renderCheckboxItem = this._renderCheckboxItem.bind(this);
  }

  componentDidUpdate() {
    //const checked = this.props.getSelectAllToggle();
    this.setState({ checked: !this.state.checked });
  }

  _renderCheckboxItem = (label, index) => {
    const { toggleFilter, mapFunction, getBuiltFilterState } = this.props;
    return (
      <FilterItem
        label={label}
        toggleFilter={toggleFilter}
        getBuiltFilterState={getBuiltFilterState}
        mapFunction={mapFunction ? mapFunction : false}
        key={index}
      />
    );
  };

  render() {
    return (
      <CollapsibleList
        handle={
          <SimpleListItem style={{ justifyContent: "space-between" }}>
            <Typography
              use="button"
              style={{ color: "teal", textAlign: "left", float: "left" }}
            >
              {this.props.title}
            </Typography>
            <Checkbox
              style={{ float: "right" }}
              checked={this.state.checked}
              onClick={event => {
                event.stopPropagation();
                this.props.toggleSelectAllFilters();
              }}
            />
          </SimpleListItem>
        }
      >
        {this.props.boxes.map(this._renderCheckboxItem)}
      </CollapsibleList>
    );
  }
}

class FilterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this._onClick = this._onClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      checked: this.props.getBuiltFilterState(this.props.label)
    });
  }

  _onClick() {
    const { label, toggleFilter } = this.props;
    this.setState({ checked: !this.state.checked });
    toggleFilter(label);
  }

  render() {
    const { label, mapFunction } = this.props;
    return (
      <SimpleListItem style={{ justifyContent: "space-between" }}>
        <Typography use="subtitle2" style={{ textAlign: "left" }}>
          {mapFunction ? mapFunction(label) : label}
        </Typography>
        <Checkbox onClick={this._onClick} checked={this.state.checked} />
      </SimpleListItem>
    );
  }
}

export default FilterList;
