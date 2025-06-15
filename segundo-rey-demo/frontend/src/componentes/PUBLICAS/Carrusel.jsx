import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/layout.css';

import foto11 from "../../assets/carrusel/Fotos11.jpg";
import foto12 from "../../assets/carrusel/Fotos12.jpg";



export default function Carrusel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Muestra solo una imagen a la vez
    slidesToScroll: 1,
    autoplay: true
  };

  const images = [foto11, foto12];

  return (
    <div className="carrusel">
      <Slider {...settings}>
        {images.map((src, idx) => (
          <div key={idx}>
            <img
  src={src}
  alt={`Imagen ${idx + 1}`}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    
  }}
/>
          </div>
        ))}
      </Slider>
    </div>
  );
}
