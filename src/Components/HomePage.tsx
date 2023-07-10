import React, {useState} from 'react';
import './caroussel.css'

interface Image {
    src: string;
    alt: string;
}

const HomePage: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const images: Image[] = [
        { src: 'tigre.jpg', alt: 'Image 1' },
        { src: 'lion4.jpg', alt: 'Image 2' },
        { src: 'zoo-084600.jpg', alt: 'Image 3' },
    ];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className="carousel">
            <div className="images-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`image-container ${index === hoveredIndex ? 'hovered' : ''}`}
                        onMouseOver={() => setHoveredIndex(index)}
                    >
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            <div className="squares-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`square ${index === hoveredIndex ? 'filled' : ''}`}
                        onMouseOver={() => setHoveredIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;