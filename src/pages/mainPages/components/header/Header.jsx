import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { meContext } from "../../../../context/MeContext";
import { modeContext } from "../../../../context/ModeContext";
import { tokenContext } from "../../../../context/TokenContext";
import "./header.css";

export const Header = () => {
	const [showSettings, setShowSettings] = useState(false);
	const { token, setToken } = useContext(tokenContext);
	const { me, setMe } = useContext(meContext);
	const navigate = useNavigate();
	const { mode, setMode } = useContext(modeContext);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setToken("");
		navigate("/public");
	};

	return (
		<header className={mode ? "bg-white" : "bg-[#191919]"}>
			<div className="max-w-[1300px] mx-auto px-7">
				<nav className="py-7 flex items-center relative">
					<Link to="/" className="text-[#C9AC8C] text-2xl">
						Badiiyat
					</Link>
					<ul className="ml-auto flex text-white">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									(mode ? "text-black" : "text-white") +
									" " +
									(isActive
										? "opacity-100 mr-10"
										: "opacity-50 mr-10")
								}
							>
								Bosh sahifa
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/books"
								className={({ isActive }) =>
									(mode ? "text-black" : "text-white") +
									" " +
									(isActive
										? "opacity-100 mr-10"
										: "opacity-50 mr-10")
								}
							>
								Kitoblar
							</NavLink>
						</li>
					</ul>
					<button
						className="size-[49px] bg-slate-100 rounded-full me"
						onClick={() => setShowSettings(!showSettings)}
					>
						<img
							src={`http://localhost:5000/${me.image}`}
							className="size-[49px] rounded-full"
						/>
					</button>
					<ul
						className={
							(mode ? "bg-[#F5F5F5] text-[#222] " : "text-[#C9AC8C] ") +
							(showSettings
								? "bg-[#222] absolute right-0 top-[80px] rounded-xl z-10"
								: "hidden")
						}
					>
						<li className="px-6 py-2">
							<Link to="/profile">Profile</Link>
						</li>
						<li className="px-6 py-2">
							<Link to="/addAuthor">Add author</Link>
						</li>
						<li className="px-6 py-2">
							<Link to="/addBook">Add book</Link>
						</li>
						<li className="px-6 py-2">
							<button className="" onClick={handleLogout}>
								Log out
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
