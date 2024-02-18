import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export const ProfilPages = () => {
	return (
		<>
			<Header />
			<main className="bg-[#191919] min-h-[656px]">
				<section>
					<div className="max-w-[1100px] px-5 mx-auto">
						<Outlet />
					</div>
				</section>
			</main>
		</>
	);
};
