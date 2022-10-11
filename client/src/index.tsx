import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18n } from "./util/language/I18n";


(async () => {

  await I18n.setup();
  
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
  
})();


