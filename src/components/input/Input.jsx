import React from "react";

export const Input = ({ placeholder, type, className, value, onChange, name, defaultValue, ref }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={
				className +
				" py-3 px-5 border rounded-[10px] w-[330px] bg-transparent border-[#B4B4BB]"
			}
			value={value}
			name={name}
			onChange={onChange}
		/>
	);
};
