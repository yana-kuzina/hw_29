import { useEffect, useState } from "react";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="images-list">
      {images.map((image) => (
        <div className="image-box" key={image.id}>
          <img src={image.download_url} />
        </div>
      ))}
    </div>
  );
};

export default ImagesList;
