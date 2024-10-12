import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "tailwindcss/tailwind.css";
import { Provider } from 'react-redux';
import Store from "./Redux/Store";

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = createRoot(rootElement);
root.render(
  <div>
    <Provider store={Store}>
      <App />
    </Provider>
  </div>
);
