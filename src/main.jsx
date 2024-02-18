import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MeProvider } from "./context/MeContext.jsx";
import { ModeContext } from "./context/ModeContext.jsx";
import { TokenProvider } from "./context/TokenContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<TokenProvider>
			<MeProvider>
				<ModeContext>
					<App />
				</ModeContext>
			</MeProvider>
		</TokenProvider>
	</BrowserRouter>
);
