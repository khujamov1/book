import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { modeContext } from "../../../../context/ModeContext";
import { Corousel } from "../../components/corousel/Corousel";

export const Books = () => {

	const{mode, setMode} = useContext(modeContext)

	return (
		<div className="max-w-[1300px] mx-auto px-7 relative">
			<Corousel className="h-[343px] mb-[184px] relative" />
			<form
				className={
					"w-[1030px] px-[73px] py-7 rounded-2xl left-[140px] top-[270px] absolute shadow-2xl " +
					(mode ? "bg-white" : "bg-[#191919]")
				}
			>
				<h3 className="text-[#C9AC8C] text-3xl mb-2 text-center">
					Qidirish
				</h3>
				<div className="flex gap-[14px]">
					<input
						type="text"
						placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
						className={
							"px-7 py-3 grow rounded-2xl " +
							(mode ? "bg-[#F5F5F5]" : "bg-[#404040]")
						}
					/>
					<button
						className={
							"inline-flex gap-[6px] bg-[#C9AC8C] px-9 py-3 rounded-2xl " +
							(mode ? "text-white" : "text-black")
						}
					>
						<BsSearch size={24} />
						Izlash
					</button>
				</div>
			</form>
			<h2 className="text-[#C9AC8C] text-3xl text-center mb-3">
				Asosiy kategoriyalar
			</h2>
			<nav>
				<nav className="mb-10">
					<ul className="flex justify-center gap-[34px] text-lg">
						<li>
							<NavLink
								to=""
								className={({ isActive }) =>
									isActive
										? "text-[#f3ca9f] opacity-100"
										: "text-white opacity-60"
								}
								end
							>
								Temuriylar davri
							</NavLink>
						</li>
						<li>
							<NavLink
								to="jadid"
								className={({ isActive }) =>
									isActive
										? "text-[#f3ca9f] opacity-100"
										: "text-white opacity-60"
								}
							>
								Jadid adabiyoti{" "}
							</NavLink>
						</li>
						<li>
							<NavLink
								to="sovet"
								className={({ isActive }) =>
									isActive
										? "text-[#f3ca9f] opacity-100"
										: "text-white opacity-60"
								}
							>
								Sovet davri{" "}
							</NavLink>
						</li>
						<li>
							<NavLink
								to="mustaqillik"
								className={({ isActive }) =>
									isActive
										? "text-[#f3ca9f] opacity-100"
										: "text-white opacity-60"
								}
							>
								Mustaqillik davri
							</NavLink>
						</li>
					</ul>
				</nav>
			</nav>
			<Outlet />
		</div>
	);
};
