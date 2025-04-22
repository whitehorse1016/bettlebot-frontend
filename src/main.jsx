import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@solana/wallet-adapter-react-ui/styles.css";

createRoot(document.getElementById("root")).render(
  <App />
);
