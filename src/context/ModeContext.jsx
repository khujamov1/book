import React, { createContext, useState } from "react";

export const modeContext = createContext();
export const ModeContext = ({ children }) => {
	const [mode, setMode] = useState(localStorage.getItem("mode") != "false");

	localStorage.setItem("mode", mode);
	return (
		<modeContext.Provider value={{ mode, setMode }}>
			{children}
		</modeContext.Provider>
	);
};
