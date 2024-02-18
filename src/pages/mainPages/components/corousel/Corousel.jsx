import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./carousel.css"
import corosel from "../../../../assets/images/corusel.png";

export const Corousel = ({className}) => {
	return (
		<Carousel className={className} showThumbs={false} autoPlay={true} useKeyboardArrows={true}>
			<img src={corosel} className="temuriylar"/>
			<img src={corosel} />
			<img src={corosel} />
			<img src={corosel} />
		</Carousel>
	);
};
