import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App, { userContext } from "./App";
import { IOUtil } from "./util/IOUtil";
import { I18n } from "./util/language/I18n";


(async () => {

  // Setup Languages
  await I18n.setup();

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>

      <BrowserRouter>
        <React.Suspense fallback="Loading">
          <App />
        </React.Suspense>
      </BrowserRouter>

    </React.StrictMode>
  );
})(); 