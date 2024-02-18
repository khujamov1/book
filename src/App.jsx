import { useContext, useState } from "react";
import { PrivateApp } from "./apps/privateApp/PrivateApp";
import { PublicApp } from "./apps/publicApp/PublicApp";
import { tokenContext } from "./context/TokenContext";

function App() {
	const {token, setToken} = useContext(tokenContext);

	if (token) {
		return <PrivateApp />;
	}
	return <PublicApp/>;
}

export default App;
