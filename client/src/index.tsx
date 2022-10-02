import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import translation configuration
import "./util/language/I18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading">
      <App />
    </React.Suspense>
  </React.StrictMode>
);
