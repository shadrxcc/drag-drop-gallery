import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/main.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import RouteSwitch from "../RouteSwitch.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      {" "}
      <BrowserRouter>
          <RouteSwitch />
  
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
