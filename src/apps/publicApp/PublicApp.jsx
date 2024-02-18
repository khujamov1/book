import { Link, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/addPages/page/login/Login";
import { Register } from "../../pages/addPages/page/register/Register";

export const PublicApp = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<header className="bg-[#191919] text-white">
						<div className="p-5 max-w-[1240px] mx-auto  flex justify-between">
							<header>Public App</header>
							<nav>
								<ul className="flex gap-7">
									<li>
										<Link to="/register">Sign Up</Link>
									</li>
									<li>
										<Link to="/login">Sign In</Link>
									</li>
								</ul>
							</nav>
						</div>
					</header>
				}
			/>
			<Route path="/register" element={<Register/>}/>
			<Route path="/login" element={<Login/>}/>
		</Routes>
	);
};
