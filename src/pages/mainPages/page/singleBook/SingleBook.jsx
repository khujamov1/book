import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tokenContext } from "../../../../context/TokenContext";

export const SingleBook = () => {
	const [book, setBook] = useState("");
	const { token, setToken } = useContext(tokenContext);
	const [author, setAuthor] = useState("");
	const [asar, setAsar] = useState([]);
	const params = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/book/bookId/${params["*"]}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setBook(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (book.author_id) {
			axios
				.get(
					`http://localhost:5000/author/authorId/${book.author_id}`,
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					setAuthor(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [book]);

	useEffect(() => {
		if (book) {
			axios
				.get(`http://localhost:5000/author/books/${book.author_id}`, {
					headers: {
						Authorization: token,
					},
				})
				.then((res) => {
					setAsar(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [book]);

	return (
		<div className="w-[1240px] mx-auto px-5 pt-5">
			<div className="flex gap-[64px] mb-24">
				<img
					src={`http://localhost:5000/${book.image}`}
					className="w-[505px] h-[600px] rounded-3xl"
					alt=""
					width={505}
					height={681}
				/>
				<div className="flex flex-col justify-center grow">
					<h3 className="text-[#C9AC8C] text-5xl mb-16">
						{book.title}
					</h3>
					<ul className="flex flex-col gap-[14px] mb-10">
						<li className="text-stone-500 text-xl flex justify-between">
							Sahifalar soni:
							<span className="inline-block text-white">
								{book.page} page
							</span>
						</li>
						<li className="text-stone-500 text-xl flex justify-between">
							Chop etilgan:
							<span className="inline-block text-white">
								{book.year} year
							</span>
						</li>
						<li className="text-stone-500 text-xl flex justify-between">
							Kitob narxi:
							<span className="inline-block text-white">
								${book.price}
							</span>
						</li>
					</ul>
					<strong className="text-[#C9AC8C] text-xl font-medium">
						To'liq ma'lumot 
					</strong>
					<hr className="mb-5 mt-2"/>
					<p className="text-white opacity-80">{book.description}</p>
				</div>
			</div>
			<div>
				<strong className="text-[#C9AC8C] mb-8 block pb-4 font-medium text-xl border-b">Asarlari</strong>
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
									<p className="text-white opacity-60">
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
