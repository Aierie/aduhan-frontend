import React, { Component } from "react";
//#notetake - good practice to install each rmwc component separately because of update issues
import { Icon } from "@rmwc/icon";
import { Typography } from "@rmwc/typography";
import "@rmwc/icon/icon.css";
import "@material/typography/dist/mdc.typography.css";

//TODO - make the card actually usable.
//Photo, title, description, upvotes.
class Info extends Component {
  render() {
    return (
      <div>
        <div style={{ position: "relative", width: 280, height: 169 }}>
          <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
            {" "}
            <Icon icon="thumb_up" />
            <Icon icon="share" />
            <Icon icon="add_comment" />
          </div>
          <img
            src={this.props.complaint.image}
            alt="Problem"
            width={280}
            height={169}
          />
        </div>
        <div>
          <Typography
            use="overline"
            style={{ color: "teal", fontSize: 15, lineHeight: 0.5 }}
          >
            {"#" +
              this.props.complaint.id.toString() +
              " " +
              this.props.complaint.title}
          </Typography>
          {/*#notetake - @rmwc/icons does not ship with its own icons, it provides a framework for displaying them in JSX.
      #notetake - if using @rmwc/icons and you want to use stuff from the examples, do npm install material-design-icons*/}
          {/* edit icons here */}
        </div>
        <hr />
        <Typography use="body2" tag="div" theme="textSecondaryOnBackground">
          {this.props.complaint.description}
        </Typography>
      </div>
    );
  }
}

export default Info;
