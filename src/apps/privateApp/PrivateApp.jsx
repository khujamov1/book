import axios from "axios";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/TokenContext";
import { AddAuthor } from "../../pages/addPages/page/addAuthor/AddAuthor";
import { AddBook } from "../../pages/addPages/page/addBook/AddBook";
import { MainPages } from "../../pages/mainPages/MainPages";
import { Books } from "../../pages/mainPages/page/books/Books";
import { HomePage } from "../../pages/mainPages/page/homePage/HomePage";
import { Jadid } from "../../pages/mainPages/page/homePage/page/Jadid";
import { Mustaqillik } from "../../pages/mainPages/page/homePage/page/Mustaqillik";
import { Sovet } from "../../pages/mainPages/page/homePage/page/Sovet";
import { Temurilar } from "../../pages/mainPages/page/homePage/page/Temurilar";
import { Profile } from "../../pages/prfilePages/page/profile/Profile";
import { Security } from "../../pages/prfilePages/page/security/Security";
import { Settings } from "../../pages/prfilePages/page/settings/Settings";
import { ProfilPages } from "../../pages/prfilePages/ProfilPages";
import { AiOutlineHome } from "react-icons/ai";
import { TemurilarBook } from "../../pages/mainPages/page/books/page/Temurilar";
import { JadidBook } from "../../pages/mainPages/page/books/page/Jadid";
import { SovetBook } from "../../pages/mainPages/page/books/page/Sovet";
import { MustaqillikBook } from "../../pages/mainPages/page/books/page/Mustaqillik";
import { SingleAuthor } from "../../pages/mainPages/page/singleAuthor/SingleAuthor";
import { SingleBook } from "../../pages/mainPages/page/singleBook/SingleBook";
import { modeContext } from "../../context/ModeContext";

export const PrivateApp = () => {
	const navigate = useNavigate();
	const {mode, setMode} = useContext(modeContext);

	return (
		<div className={mode ? "bg-white min-h-screen" : "bg-[#191919] min-h-screen"}>
			<button
				className="absolute top-[100px] px-5 py-2 text-stone-900"
				onClick={() => navigate("/")}
			>
				<AiOutlineHome size={30}/>
			</button>
			<Routes>
				<Route path="" element={<MainPages />}>
					<Route path="/*" element={<HomePage />}>
						<Route index element={<Temurilar />} />
						<Route path="jadid" element={<Jadid />} />
						<Route path="sovet" element={<Sovet />} />
						<Route path="mustaqillik" element={<Mustaqillik />} />
					</Route>
					<Route path="books/*" element={<Books />}>
						<Route index element={<TemurilarBook />} />
						<Route path="jadid" element={<JadidBook />} />
						<Route path="sovet" element={<SovetBook />} />
						<Route path="mustaqillik" element={<MustaqillikBook />} />
					</Route>
					<Route path="singleAuthor/*" element={<SingleAuthor/>}/>
					<Route path="singlebook/*" element={<SingleBook/>}/>
				</Route>
				<Route path="profile/*" element={<ProfilPages />}>
					<Route index element={<Profile />} />
					<Route path="security" element={<Security />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="/addBook" element={<AddBook />} />
				<Route path="/addAuthor" element={<AddAuthor />} />
			</Routes>
		</div>
	);
};
