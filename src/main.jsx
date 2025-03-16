import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ScreenContextProvider } from "./contexts/ScreenContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScreenContextProvider>
    <BrowserRouter basename="/last-minute/">
      <App />
    </BrowserRouter>
  </ScreenContextProvider>
);
