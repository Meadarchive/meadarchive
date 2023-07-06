import React from "react";
import ReactDOM from "react-dom/client";
import "./global_styles/index.css";
import "./global_styles/button.css";
import "./global_styles/input.css";
import Router from "./Router/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
