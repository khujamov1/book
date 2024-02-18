import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./TokenContext";

export const meContext = createContext();

export const MeProvider = ({ children }) => {
	const { token, setToken } = useContext(tokenContext);
	const [me, setMe] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:5000/user/me", {
				headers: { Authorization: token },
			})
			.then((res) => setMe(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<meContext.Provider value={{ me, setMe }}>
			{children}
		</meContext.Provider>
	);
};
