import React from "react";
import { render } from "react-dom";

function Hi() {
  debugger;
  return <p>Webpack is so easy and awesome</p>;
}

render(<Hi />, document.getElementById("app"));
