import React, { Component } from "react";
import { ThemeProvider } from "@rmwc/theme";
import BaseMapView from "./views/BaseMapView/BaseMapView.jsx";
import generatedComplaints from "../data/features.json";

let nextId = 0;
const complaintsList = [];
const complaintItem = {
  image: "https://i.imgur.com/HrCoEbd.jpg",
  title: "Complaint title here but long",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer quis auctor elit sed vulputate mi sit amet. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Commodo odio aenean sed adipiscing diam donec. Mauris vitae ultricies leo integer. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Nascetur ridiculus mus mauris vitae. Purus non enim praesent elementum facilisis leo vel fringilla. At elementum eu facilisis sed odio morbi quis commodo odio. Egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Leo a diam sollicitudin tempor id."
};

//using small number till optimized
for (let item of generatedComplaints.generated.slice(0, 100)) {
  complaintsList.push({ ...complaintItem, ...item, id: nextId++ });
}

class App extends Component {
  render() {
    return (
      <ThemeProvider
        options={{
          primary: "teal",
          secondary: "lightblue",
          primaryBg: "grey",
          onPrimary: "#000",
          textPrimaryOnBackground: "white"
        }}
      >
        <BaseMapView complaintsList={complaintsList} />
      </ThemeProvider>
    );
  }
}

export default App;
