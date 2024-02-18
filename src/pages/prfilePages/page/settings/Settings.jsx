import { useFormik } from "formik";
import { useContext } from "react";
import { Switcher } from "../../../../components/switch/Switch";
import { modeContext } from "../../../../context/ModeContext";

export const Settings = () => {


	const{mode, setMode} = useContext(modeContext);
	const formik = useFormik({
		initialValues: {
			lang: ""
		},
		onSubmit: (values) => {
			console.log(values);
		}
	})
	return (
		<div className="pt-[107px] text-[#F3F6F9] max-w-[700px] mx-auto">
			<h2 className="text-[#DEDEDE] mb-8 text-lg font-medium">
				Settings
			</h2>
			<form className="w-[710px]" onSubmit={formik.handleSubmit}>
				<label className="flex flex-col mb-3">
					Language
					<select className="h-[44px] rounded-md mt-2 text-[#222] px-5" name="lang" onChange={formik.handleChange}>
						<option value="en">English</option>
						<option value="ru">Russion</option>
						<option value="uz">Uzbek</option>
					</select>
					<span className="opacity-50">
						Please enter your language.
					</span>
				</label>
				<div className="flex flex-col gap-2 mb-10">
					<strong>Theme</strong>
					<Switcher/>
				</div>
				<hr className="mb-8"/>
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
