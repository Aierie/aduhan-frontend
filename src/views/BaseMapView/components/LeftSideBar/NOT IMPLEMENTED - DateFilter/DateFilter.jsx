import React, { Component } from "react";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { CollapsibleList } from "@rmwc/list";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import "@rmwc/list/collapsible-list.css";
import "@material/button/dist/mdc.button.css";

class DateFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div align="center">
        <CollapsibleList
          handle={
            <Button label="DATE" style={["onSecondary", "secondaryBg"]} />
          }
        >
          <div style={{ display: "flex", position: "relative" }}>
            <TextField
              style={{ float: "left" }}
              label="Start date"
              type="date"
            />
            <TextField
              style={{ float: "right" }}
              label="End date"
              type="date"
            />
          </div>
        </CollapsibleList>
      </div>
    );
  }
}

export default DateFilter;
