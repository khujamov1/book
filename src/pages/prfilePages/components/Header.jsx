import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { modeContext } from "../../../context/ModeContext";

export const Header = () => {

	const {mode, setMode} = useContext(modeContext);
	return (
		<header className="bg-[#191919]">
				<nav>
					<ul className="flex text-white items-center">
						<li className="flex-grow font-bold">
							<NavLink end
								to="/profile"
								className={({ isActive }) =>
									isActive
										? "bg-white text-black block w-full p-[23px]"
										: "block w-full p-[23px]"
								}
							>
								<span className="inline-block text-center font-semibold rounded-lg mr-[10px] pt-1 size-[35px] border-2 border-[#3d3d3d]">1</span>Profile
							</NavLink>
						</li>
                        <li className="flex-grow font-bold">
							<NavLink
								to="security"
								className={({ isActive }) =>
									isActive
										? "bg-white text-black block w-full p-[23px]"
										: "block w-full p-[23px]"
								}
							>
								<span className="inline-block text-center font-semibold rounded-lg mr-[10px] pt-1 size-[35px] border-2 border-[#3d3d3d]">2</span>Security
							</NavLink>
						</li>
						<li className="flex-grow font-bold">
							<NavLink
								to="settings"
								className={({ isActive }) =>
									isActive
										? "bg-white text-black block w-full p-[23px]"
										: "block w-full p-[23px]"
								}
							>
								<span className="inline-block text-center font-semibold rounded-lg mr-[10px] pt-1 size-[35px] border-2 border-[#3d3d3d]">3</span>Settings
							</NavLink>
						</li>
					</ul>
				</nav>
		</header>
	);
};
