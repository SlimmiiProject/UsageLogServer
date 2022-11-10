import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18n } from "./util/language/I18n";


(async () => {

  // Setup Languages
  await I18n.setup();

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );


  root.render(
    <React.StrictMode>
      <React.Suspense fallback="Loading">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Suspense>
    </React.StrictMode>
  );
})(); 