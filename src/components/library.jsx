import { useRef, useState } from "react";
import { images } from "./imagedata";

const Library = () => {
  const [galleryImages, setGalleryImages] = useState(images);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) {
      return;
    }

    const draggedIndex = dragItem.current;
    const dragOverIndex = dragOverItem.current;

    if (draggedIndex === dragOverIndex) {
      return;
    }

    const galleryCopy = [...galleryImages];
    const [draggedItem] = galleryCopy.splice(draggedIndex, 1);
    galleryCopy.splice(dragOverIndex, 0, draggedItem);

    setGalleryImages(galleryCopy);

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="grid drag grid-cols-2 md:grid-cols-4">
      {galleryImages.map((image, index) => {
        return (
          <img 
            key={image.id}
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            className="w-[10em] md:w-[20em] m-auto"
            src={image.img}
            alt=""
          />
        );
      })}
    </div>
  );
};

export default Library;
