import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./global_styles/index.css";
import "./global_styles/button.css";
import "./global_styles/input.css";
import Router from "./Router/Router";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
	<StrictMode>
		<Router />
	</StrictMode>
);
