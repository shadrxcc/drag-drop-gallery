import { useRef, useState } from "react";
import { images } from "./imagedata";

const Library = () => {
  const [galleryImages, setGalleryImages] = useState(images);
  const dragItem = useRef(null);
  const [tag, setTag] = useState("");
  const dragOverItem = useRef(null);
  const [notfound, setNotFound] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (tag.trim() === "") {
      setGalleryImages(images);
    } else {
      const filteredImages = images.filter((image) => image.tags.includes(tag));
      setNotFound(false);
      setGalleryImages(filteredImages);
      if (filteredImages.length === 0) {
        setNotFound(true);
      }
    }
  };

  return (
    <div id="library" className="px-2 sm:px-5">
      <form
        action="search"
        onClick={handleSearch}
        className="flex justify-center py-8 gap-x-1.5 items-center"
      >
        <input
          type="text"
          value={tag}
          className="w-3/4 p-3 bg-transparent border rounded-lg"
          name="text"
          id="text"
          placeholder=""
          onChange={(e) => setTag(e.target.value)}
        />
        <button className="bg-white py-3 px-3 text-black rounded-lg">
          Search
        </button>
      </form>

      {notfound ? (
        <div className="flex">
          <p className="items-center text-3xl mx-auto">
            No items match your search. Try again
          </p>
        </div>
      ) : (
        <div className="grid drag py-10 grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2 lg:grid-cols-4 xl:grid-cols-5">
          {galleryImages.map((image, index) => {
            return (
              <div
                key={image.id}
                draggable
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                className=" rounded-2xl w-full bg-cover bg-center bg-no-repeat h-[20em] bg-red-600 m-auto"
                style={{ backgroundImage: `url(${image.img})` }}
                alt=""
              >
                {" "}
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Library;
