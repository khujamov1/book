import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import register from "../../../../assets/images/register.svg";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { tokenContext } from "../../../../context/TokenContext";

export const Register = () => {

const {token, setToken} = useContext(tokenContext);

	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name: "",
			phone: "",
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			axios
				.post("http://localhost:5000/user/register", {
					first_name: values.first_name,
					last_name: values.last_name,
					phone: values.phone,
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					if(res.status === 200) {
						localStorage.setItem("token", res.data.token)
						setToken(res.data.token)
					}
				})
				.catch((err) => console.log(err));
		},
		validate: (values) => {
			const errors = {};

			if (!values.first_name) {
				errors.first_name = "Required";
			} else if (values.first_name.length < 3) {
				errors.first_name = "Must be longer 3 characters";
			}
			if (!values.last_name) {
				errors.last_name = "Required";
			} else if (values.last_name.length < 3) {
				errors.last_name = "Must be longer 3 characters";
			}
			if (!values.phone) {
				errors.phone = "Required";
			} else if (values.phone.length < 3) {
				errors.phone = "Must be longer 3 characters";
			}
			if (!values.email) {
				errors.email = "Required";
			} else if (values.email.length < 3) {
				errors.email = "Must be longer 3 characters";
			}
			if (!values.password) {
				errors.password = "Required";
			} else if (values.password.length < 3) {
				errors.password = "Must be longer 3 characters";
			}

			return errors;
		},
	});

	return (
		<div className="min-h-screen flex items-center">
			<div className="bg-[#C9AC8C] h-screen w-1/2 py-[130px]">
				<img src={register} alt="" className="mx-auto" />
			</div>
			<div className="bg-[#191919] h-screen w-1/2">
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col w-[328px] gap-4 mx-auto text-white mt-[80px]"
					autoComplete="off"
				>
					<h2 className="font-bold text-[36px]">Sign Up</h2>
					<p>
						Already have an account?{" "}
						<Link to="/login" className="text-blue-400">
							{" "}
							Sign In
						</Link>
					</p>
					<input
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						name="first_name"
						id="first_name"
						placeholder="First name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="text"
						value={formik.values.first_name}
					/>
					{formik.touched.first_name && formik.errors.first_name ? (
						<span className="block text-red-600">
							{formik.errors.first_name}
						</span>
					) : (
						""
					)}
					<input
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						name="last_name"
						id="last_name"
						placeholder="Last name"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.last_name}
					/>
					{formik.touched.last_name && formik.errors.last_name ? (
						<span className="block text-red-600">
							{formik.errors.last_name}
						</span>
					) : (
						""
					)}
					<input
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						name="phone"
						id="phone"
						placeholder="Phone"
						type="tel"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.phone}
					/>
					{formik.touched.phone && formik.errors.phone ? (
						<span className="block text-red-600">
							{formik.errors.phone}
						</span>
					) : (
						""
					)}
					<input
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						name="email"
						id="email"
						placeholder="Email"
						type="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? (
						<span className="block text-red-600">
							{formik.errors.email}
						</span>
					) : (
						""
					)}
					<input
						className="py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
						name="password"
						id="password"
						placeholder="Passwor"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						on
					/>
					{formik.touched.password && formik.errors.password ? (
						<span className="block text-red-600 my-0">
							{formik.errors.password}
						</span>
					) : (
						""
					)}
					<button
						type="submit"
						className="py-3 px-5 text-center font-medium bg-white text-black rounded-3xl"
					>
						Next step
					</button>
				</form>
			</div>
		</div>
	);
};
