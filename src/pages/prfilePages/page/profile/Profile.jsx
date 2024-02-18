import axios from "axios";
import { useFormik } from "formik";
import { useContext, useRef } from "react";
import { Input } from "../../../../components/input/Input";
import { meContext } from "../../../../context/MeContext";
import { tokenContext } from "../../../../context/TokenContext";
import { BsCamera } from "react-icons/bs";
import "./profile.css";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const { me, setMe } = useContext(meContext);
	const { token, setToken } = useContext(tokenContext);
	const imageSrc = me.image;
	const fileImage = useRef();
	const formData = new FormData();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			first_name: me.first_name,
			last_name: me.last_name,
			phone: me.phone,
			image: me.image,
		},
		onSubmit: (values) => {
			formData.set("first_name", values.first_name);
			formData.append("last_name", values.last_name);
			formData.append("phone", values.phone);
			formData.append("image", fileImage.current.files[0]);
			axios
				.put("http://localhost:5000/user/account", formData, {
					headers: { Authorization: token },
				})
				.then((res) => {
					if (res.status === 201) {
						setMe(me);
					}
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		},
	});

	return (
		<div className="flex gap-[110px] pt-[107px] relative">
			<img src={"http://localhost:5000/" + imageSrc} alt="" className="size-[175px] rounded-full" />
			<div className="text-[#F3F6F9]">
				<h2 className="text-[#DEDEDE] mb-8 text-lg font-medium">
					My profile
				</h2>
				<form className="w-[710px]" onSubmit={formik.handleSubmit}>
					<label className="flex flex-col mb-5">
						First name
						<Input
							type="text"
							className="w-full bg-white text-black mt-2"
							defaultValue={me.first_name}
							value={formik.values.first_name}
							onChange={formik.handleChange}
							name="first_name"
						/>
						<span className="opacity-50">
							Please enter your first name.
						</span>
					</label>
					<label className="flex flex-col mb-5">
						Last name
						<Input
							type="text"
							className="w-full bg-white text-black mt-2"
							defaultValue={me.last_name}
							value={formik.values.last_name}
							onChange={formik.handleChange}
							name="last_name"
						/>
						<span className="opacity-50">
							Please enter your last name.
						</span>
					</label>
					<label className="flex flex-col mb-5">
						Phone
						<Input
							type="tel"
							className="w-1/2 bg-white text-black mt-2"
							defaultValue={formik.values.phone}
							value={me.phone}
							onChange={formik.handleChange}
							name="phone"
						/>
						<span className="opacity-50">
							Please enter your phone number.
						</span>
					</label>
					<label className="inline-flex flex-col mb-5 absolute left-[130px] top-[230px] cursor-pointer bg-[#161616] p-2 rounded-lg shadow-lg shadow-black">
						<BsCamera size={33} color="#464E5F" />
						<input
							ref={fileImage}
							type="file"
							className="w-1/2 bg-white text-black mt-2 inputs"
							onChange={formik.handleChange}
							name="image"
						/>
						<i className="fa fa-image fa-2x icons"></i>
					</label>
					<hr className="mb-5 opacity-10" />
					<button
						className="bg-white text-black font-semibold block ml-auto py-3 px-5 rounded-md"
						type="submit"
					>
						Save changes
					</button>
				</form>
			</div>
		</div>
	);
};
