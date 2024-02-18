import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../../../components/skeleton/Skeleton";
import "../../../main.css";

export const SovetBook = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/book/genreId/3")
			.then((res) => setBooks(res.data))
			.catch((err) => console.log(err));
	}, []);

	console.log(books);
	return (
		<ul className="pb-[200px] flex flex-wrap gap-x-5 gap-y-6">
			{books.length ? (
				books.map((item) => {
					return (
						<li
							className="w-[295px] h-[365px] bg-[#1e1e1e] rounded-[22px] item relative"
							key={item.id}
						>
							<Link to={`/singlebook/${item.id}`}>
								<img
									src={`http://localhost:5000/` + item.image}
									width={295}
									height={224}
									className="w-[295px] h-[224px] mb-3 rounded-t-[22px]"
									alt={item.title}
								/>
								<div className="pl-4">
									<h3 className="text-[rgb(201,172,141)] font-medium text-2xl mb-1">
										{item.title}
									</h3>
									<time className="text-white opacity-60">
										{item.author_id}
									</time>
								</div>
							</Link>
						</li>
					);
				})
			) : (
				<>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</>
			)}
		</ul>
	);
};
