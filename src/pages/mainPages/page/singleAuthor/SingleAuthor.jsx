import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { modeContext } from "../../../../context/ModeContext";
import { tokenContext } from "../../../../context/TokenContext";

export const SingleAuthor = () => {
	const [author, setAuthor] = useState("");
	const { token, setToken } = useContext(tokenContext);
	const [asar, setAsar] = useState([]);
	const params = useParams();
	const { mode, setMode } = useContext(modeContext);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/authorId/${params["*"]}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setAuthor(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/books/${author.id}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setAsar(res.data);
			})
			.catch((err) => console.log(err));
	}, [author]);

	console.log(asar);

	return (
		<div className="w-[1240px] mx-auto px-5 pt-5">
			<div className="flex gap-[64px] mb-24">
				<img
					src={`http://localhost:5000/${author.image}`}
					className="w-[505px] h-[300px]"
					alt=""
					width={505}
					height={681}
				/>
				<div className="flex flex-col justify-center">
					<h2 className="mb-[10px] text-5xl text-[#C9AC8C] font-semibold">
						{author.first_name + " " + author.last_name}
					</h2>
					<p
						className={
							"mb-[50px] " + (mode ? "text-[#222]" : "text-white")
						}
					>
						{author.bio}
					</p>
					<ul className="flex gap-14">
						<li className="flex flex-col">
							<p
								className={
									"opacity-60 text-sm " +
									(mode ? "text-[#222]" : "text-white")
								}
							>
								Tavallud sanasi
							</p>
							<strong className="text-[#C9AC8C] text-4xl font-normal">
								{author.date_of_birth}
							</strong>
							<p
								className={
									"opacity-60 text-sm " +
									(mode ? "text-[#222]" : "text-white")
								}
							>
								{author.country}
							</p>
						</li>
						<li className="flex flex-col">
							<p
								className={
									"opacity-60 text-sm " +
									(mode ? "text-[#222]" : "text-white")
								}
							>
								Vafot etgan sanasi
							</p>
							<strong className="text-[#C9AC8C] text-4xl font-normal">
								{author.date_of_death}
							</strong>
							<p
								className={
									"opacity-60 text-sm " +
									(mode ? "text-[#212]" : "text-white")
								}
							>
								{author.country}
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<strong className="text-[#C9AC8C] mb-8 block">Asarlari</strong>
				<ul>
					{asar.map((item) => {
						return (
							<li key={item.id}>
								<Link to={`/singlebook/${item.id}`}>
									<img
										src={`http://localhost:5000/${item.image}`}
										className="rounded-[22px] w-[190px] h-[283px]"
										width={190}
										height={283}
									/>
									<strong className="text-[#C9AC8C]">
										{item.title}
									</strong>
									<p
										className={
											mode ? "opacity-80" : "text-white opacity-60"
										}
									>
										{author.first_name +
											" " +
											author.last_name}
									</p>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
