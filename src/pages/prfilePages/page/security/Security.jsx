import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Input } from "../../../../components/input/Input";
import { tokenContext } from "../../../../context/TokenContext";

export const Security = () => {
	const { token, setToken } = useContext(tokenContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			currentPassword: "",
			newPassword: "",
		},
		onSubmit: (values) => {
			console.log(values);
			axios
				.put(
					"http://localhost:5000/user/security",
					{
						email: values.email,
						currentPassword: values.currentPassword,
						newPassword: values.newPassword,
					},
					{
						headers: { Authorization: token },
					}
				)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	});

	return (
		<div className="pt-[107px] text-[#F3F6F9] max-w-[700px] mx-auto">
			<h2 className="text-[#DEDEDE] mb-8 text-lg font-medium">
				Change Or Recover Your Password:
			</h2>
			<form className="w-[710px]" onSubmit={formik.handleSubmit}>
				<label className="flex flex-col mb-5">
					Email
					<Input
						type="email"
						name="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						className="w-full bg-white text-black mt-2"
					/>
					<span className="opacity-50">
						Please enter your first name.
					</span>
				</label>
				<label className="flex flex-col mb-5">
					Current password
					<Input
						type="password"
						name="currentPassword"
						onChange={formik.handleChange}
						value={formik.values.currentPassword}
						className="w-full bg-white text-black mt-2"
					/>
					<span className="opacity-50">
						Please enter your current password.
					</span>
				</label>
				<label className="flex flex-col mb-5">
					New Password
					<Input
						type="password"
						name="newPassword"
						onChange={formik.handleChange}
						value={formik.values.newPassword}
						className="w-full bg-white text-black mt-2"
					/>
					<span className="opacity-50">
						Please enter new password.
					</span>
				</label>
				<button
					className="bg-white text-black font-semibold block ml-auto py-3 px-5 rounded-md"
					type="submit"
				>
					Save changes
				</button>
			</form>
		</div>
	);
};
