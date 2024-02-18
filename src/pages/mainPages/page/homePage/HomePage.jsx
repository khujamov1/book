import axios from "axios";
import { useContext, useEffect } from "react";
import { Corousel } from "../../components/corousel/Corousel";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { modeContext } from "../../../../context/ModeContext";
import { useFormik } from "formik";
import { useState } from "react";

export const HomePage = () => {
	const { mode, setMode } = useContext(modeContext);
	const [authors, setAuthors] = useState([]);

	const formik = useFormik({
		initialValues: {
			author_search: "",
		},
		onSubmit: (values) => {
			values.author_search
				? axios
						.get(
							`http://localhost:5000/author/search?author=${values.author_search}`
						)
						.then((res) => {
							if (res.status === 201) {
								setAuthors(res.data);
							}
						})
						.catch((err) => console.log(err))
				: "";
		},
	});

	return (
		<div className="max-w-[1300px] mx-auto px-7 relative">
			<Corousel className="h-[343px] mb-[184px] relative" />
			<form
				onSubmit={formik.handleSubmit}
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
						onChange={formik.handleChange}
						value={formik.values.author_search}
						name="author_search"
						placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
						className={
							"px-7 py-3 grow rounded-2xl " +
							(mode ? "bg-[#F5F5F5]" : "bg-[#404040]")
						}
					/>
					<button
						type="submit"
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

			<ul className="pb-[200px] flex flex-wrap gap-x-5 gap-y-6">
				{authors.map((item) => {
					return (
						<li
							className="w-[295px] h-[365px] bg-[#1e1e1e] rounded-[22px] item relative"
							key={item.id}
						>
							<Link to={`/singleAuthor/${item.id}`}>
								<img
									src={`http://localhost:5000/` + item.image}
									width={295}
									height={224}
									className="w-[295px] h-[224px] mb-3 rounded-t-[22px]"
									alt={item.first_name + " " + item.last_name}
								/>
								<div className="pl-4">
									<h3 className="text-[rgb(201,172,141)] font-medium text-2xl mb-1">
										{item.first_name + " " + item.last_name}
									</h3>
									<time className="text-white opacity-60">
										{item.date_of_birth +
											" - " +
											(item.date_of_death == 0
												? " alive "
												: item.date_of_death)}
									</time>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>

			<h2 className="text-[#C9AC8C] text-3xl text-center mb-3">
				Asosiy kategoriyalar
			</h2>
			<nav className="mb-10">
				<ul className="flex justify-center gap-[34px] text-lg">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "text-[#f3ca9f] opacity-100"
									: "text-white opacity-60"
							}
						>
							Temuriylar davri{" "}
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
			<Outlet />
		</div>
	);
};
