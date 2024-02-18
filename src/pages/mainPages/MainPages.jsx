import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";

export const MainPages = () => {
	return <div>
        <Header/>
        <Outlet/>
    </div>;
};
