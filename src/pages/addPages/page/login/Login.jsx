import { Link, useNavigate } from "react-router-dom";
import login from "../../../../assets/images/login.svg";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { tokenContext } from "../../../../context/TokenContext";

export const Login = () => {
	const { token, setToken } = useContext(tokenContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			axios
				.post("http://localhost:5000/user/login", {
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						localStorage.setItem("token", res.data.token);
						setToken(res.data.token);
						navigate("/");
					}
				})
				.catch((err) => console.log(err));
		},
		validate: (values) => {
			const errors = {};
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
				<img src={login} alt="" className="mx-auto" />
			</div>
			<div className="bg-[#191919] h-screen w-1/2 pt-16">
				<form
					className="flex flex-col w-[328px] gap-4 mx-auto text-white mt-[120px]"
					onSubmit={formik.handleSubmit}
				>
					<h2 className="font-bold text-[36px]">Sign In</h2>
					<p>
						Do not you have an account?{" "}
						<Link to="/register" className="text-blue-400">
							{" "}
							Sign Up
						</Link>
					</p>
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
