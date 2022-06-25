import { useEffect, useState } from "react";

import axios from "../helpers/axios";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("/list", { params: { limit: 10, page } }).then((data) => {
      setImages((prevState) => [...prevState, ...data]);
      setLoading(false);
    });
  }, [page]);

  const handleShowMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="images-list">
      {images.map((image) => (
        <div className="image-box" key={image.id}>
          <img src={image.download_url} />
        </div>
      ))}

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <button onClick={handleShowMore}>Show more</button>
      )}
    </div>
  );
};

export default ImagesList;
