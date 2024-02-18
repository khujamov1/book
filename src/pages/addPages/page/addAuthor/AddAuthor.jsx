import { Input } from "../../../../components/input/Input";
import { FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import { tokenContext } from "../../../../context/TokenContext";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";

export const AddAuthor = () => {
	const [genre, setGenre] = useState([]);

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

	const formData = new FormData();
	const fileImg = useRef();
	const { token, setToken } = useContext(tokenContext);

	const request = () => {
		axios
			.post("http://localhost:5000/author", formData, {
				headers: { Authorization: token },
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name: "",
			date_of_birth: "",
			date_of_death: "",
			country: "",
			genre_id: "",
			bio: "",
			image: "",
		},
		onSubmit: (values) => {
			formData.append("first_name", values.first_name);
			formData.append("last_name", values.last_name);
			formData.append("date_of_birth", Number(values.date_of_birth));
			formData.append("date_of_death", Number(values.date_of_death));
			formData.append("country", values.country);
			formData.append("genre_id", Number(values.genre_id));
			formData.append("bio", values.bio);
			formData.append("image", fileImg.current.files[0]);
			request();
		},
	});

	return (
		<div className="min-h-screen flex items-center">
			<div className="bg-[#1B1B1B] min-h-screen w-1/2 py-[130px]"></div>
			<div className="bg-[#191919] min-h-screen w-1/2 pt-12">
				<form
					className="flex flex-col w-[328px] gap-4 mx-auto text-white"
					onSubmit={formik.handleSubmit}
					autoComplete="off"
				>
					<h2 className="font-semibold text-[32px]">Add author</h2>
					<Input
						className=""
						placeholder="First name"
						type="text"
						name="first_name"
						value={formik.values.first_name}
						id="first_name"
						onChange={formik.handleChange}
					/>
					<Input
						className=""
						placeholder="Last name"
						type="text"
						onChange={formik.handleChange}
						name="last_name"
						value={formik.values.last_name}
						id="first_name"
					/>
					<Input
						placeholder="Year of birth"
						type="number"
						onChange={formik.handleChange}
						name="date_of_birth"
						value={formik.values.date_of_birth}
						id="date_of_birth"
					/>
					<Input
						placeholder="Year of death"
						type="number"
						name="date_of_death"
						value={formik.values.date_of_death}
						id="date_of_death"
						onChange={formik.handleChange}
					/>
					<Input
						className=""
						placeholder="Country"
						type="text"
						name="country"
						value={formik.values.country}
						id="country"
						onChange={formik.handleChange}
					/>
					<select
						name="genre_id"
						id="genre_id"
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						onChange={formik.handleChange}
						value={formik.values.genre_id}
					>
						<option hidden>Genre</option>
						{genre.map((item) => (
							<option
								key={item.id}
								value={item.id}
								className="bg-[#222]"
							>
								{item.name}
							</option>
						))}
					</select>
					<textarea
						className=" py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB] resize-none h-[82px]"
						placeholder="Bio"
						onChange={formik.handleChange}
						name="bio"
						value={formik.values.bio}
						id="bio"
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
