import { Input } from "../../../../components/input/Input";
import { FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import { tokenContext } from "../../../../context/TokenContext";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";

export const AddBook = () => {
	const formData = new FormData();
	const fileImg = useRef();
	const { token, setToken } = useContext(tokenContext);
	const [genre, setGenre] = useState([]);
	const [id, setId] = useState(0);
	const [author, setAuthor] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/author/genreId/" + id)
			.then((res) => setAuthor(res.data))
			.catch((err) => console.log(err));
	}, [id]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/genre")
			.then((res) => {
				if (res.status === 201) {
					setGenre(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const request = () => {
		axios
			.post("http://localhost:5000/book", formData, {
				headers: { Authorization: token },
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const formik = useFormik({
		initialValues: {
			title: "",
			page: "",
			year: "",
			price: "",
			genre_id: "",
			author_id: "",
			description: "",
			image: "",
		},
		onSubmit: (values) => {
			formData.append("title", values.title);
			formData.append("page", values.page);
			formData.append("year", Number(values.year));
			formData.append("price", Number(values.price));
			formData.append("genre_id", Number(values.genre_id));
			formData.append("author_id", values.author_id);
			formData.append("description", values.description);
			formData.append("image", fileImg.current.files[0]);
			request();
			console.log(values);
		},
	});

	const handleChange = (evt) => {
		setId(evt.target.value);
		console.log(evt.target.value);
	};

	return (
		<div className="min-h-screen flex items-center">
			<div className="bg-[#1B1B1B] min-h-screen w-1/2 py-[130px]"></div>
			<div className="bg-[#191919] min-h-screen w-1/2 pt-12">
				<form
					className="flex flex-col w-[328px] gap-4 mx-auto text-white"
					onSubmit={formik.handleSubmit}
				>
					<h2 className="font-semibold text-[32px]">Add Book</h2>
					<Input
						className=""
						placeholder="Title"
						type="text"
						name="title"
						value={formik.values.title}
						id="title"
						onChange={formik.handleChange}
					/>
					<Input
						className=""
						placeholder="Pages"
						type="text"
						onChange={formik.handleChange}
						name="page"
						value={formik.values.page}
						id="page"
					/>
					<Input
						placeholder="Year"
						type="number"
						onChange={formik.handleChange}
						name="year"
						value={formik.values.year}
						id="year"
					/>
					<Input
						placeholder="Price"
						type="text"
						name="price"
						value={formik.values.price}
						id="price"
						onChange={formik.handleChange}
					/>

					<select
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						name="genre_id"
						id="genre_id"
						onChange={(evt) => {
							formik.setFieldValue("genre_id", evt.target.value);
							handleChange(evt);
						}}
					>
						<option hidden>Genre</option>
						{genre.length &&
							genre.map((item) => (
								<option
									value={item.id}
									key={item.id}
									className="bg-[#222]"
								>
									{item.name}
								</option>
							))}
					</select>
					<select
						name="author_id"
						id="author_id"
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						onChange={formik.handleChange}
						value={formik.values.author_id}
					>
						<option hidden>Author</option>
						{author.length &&
							author.map((item) => {
								return (
									<option
										key={item.id}
										className="bg-[#222]"
										value={item.id}
									>
										{item.first_name + " " + item.last_name}
									</option>
								);
							})}
					</select>
					<textarea
						className=" py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB] resize-none h-[82px]"
						placeholder="Description"
						onChange={formik.handleChange}
						name="description"
						value={formik.values.description}
						id="description"
					></textarea>
					<label className="inline-flex flex-col mb-5 absolute left-[180px] top-[130px] w-[325px] h-[428px] cursor-pointer bg-[#4D4D4D] border-2 border-dashed rounded-2xl justify-center opacity-35">
						<FaPlus size={60} className="mb-2 mx-auto" />
						<span className="block mx-auto w-[200px] text-center">
							Click or drag file to this area to upload
						</span>
						<input
							ref={fileImg}
							type="file"
							className="w-1/2 bg-white text-black mt-2 inputs"
							onChange={formik.handleChange}
							name="image"
						/>
						<i className="fa fa-image fa-2x icons"></i>
					</label>
					<button
						type="submit"
						className="py-3 px-5 text-center font-medium bg-white text-black rounded-3xl"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};
