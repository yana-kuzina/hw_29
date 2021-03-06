import { useEffect, useState } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import axios from "../helpers/axios";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    axios.get("/list", { params: { limit: 10, page } }).then((data) => {
      setImages((prevState) => [...prevState, ...data]);
      setLoading(false);
    });
  }, [page]);

  const handleShowMore = () => {
    setPage(page + 1);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setActiveImage(null);
  };

  const handleDialogOpen = (image) => () => {
    setDialogOpen(true);
    setActiveImage(image);
  };

  return (
    <div>
      <ImageList cols={2} rowHeight={300} gap={15}>
        {images.map((image) => (
          <ImageListItem
            key={image.id}
            sx={{
              "& .MuiImageListItem-img": {
                objectFit: "contain",
                height: "100%",
              },
            }}
          >
            <img onClick={handleDialogOpen(image)} src={image.download_url} />
          </ImageListItem>
        ))}
      </ImageList>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <button onClick={handleShowMore}>Show more</button>
      )}

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>About image</DialogTitle>
        <Box sx={{ p: 2 }}>
          <p>author: {activeImage?.author}</p>
          <p>width: {activeImage?.width}px</p>
          <p>height: {activeImage?.height}px</p>
        </Box>
      </Dialog>
    </div>
  );
};

export default ImagesList;
