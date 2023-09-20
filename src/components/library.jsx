import { useRef, useState } from "react";
import { images } from "./imagedata";
import { MdMenu, MdClose } from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import { supabase } from "../../client";

const Library = () => {
  const [galleryImages, setGalleryImages] = useState(images);
  const dragItem = useRef(null);
  const [tag, setTag] = useState("");
  const [menutoggle, setMenuToggle] = useState(false);
  const dragOverItem = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notfound, setNotFound] = useState(false);

  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during sign-out.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
      {error && (
        <Alert className="rounded-lg text-black" status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <div className="flex justify-evenly items-center w-full">
          <form
            action="search"
            onClick={handleSearch}
            className="flex flex-[0.8_1_0] justify-center py-8 gap-x-1.5 items-center"
          >
            <input
              type="text"
              value={tag}
              className="w-full p-3 bg-transparent border rounded-lg"
              name="text"
              id="text"
              placeholder=""
              onChange={(e) => setTag(e.target.value)}
            />
            <button className="bg-white py-3 px-3 text-black rounded-lg">
              Search
            </button>
          </form>

          <MdMenu
            className="sm:hidden"
            onClick={() => setMenuToggle(true)}
            color="white"
            size={30}
          />
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden p-3 border rounded-lg sm:block"
            >
              {loading ? (
                <BiLoader className="loader" color="white" size={20} />
              ) : (
                "Sign Out"
              )}
            </button>
          ) : (
            <Link to={`/login`}>
              <button className="hidden border p-3 rounded-lg sm:block">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {menutoggle && (
        <div
          className={`absolute p-4 w-full flex sm:hidden top-0 flex-col gap-y-10 bg-black text-white h-2/4 transition-transform ${
            menutoggle ? "translate-y-0" : "-translate-y-22em"
          }`}
        >
          <div>
            <MdClose
              onClick={() => setMenuToggle(false)}
              className="float-right"
              color="white"
              size={30}
            />
          </div>
          <Link to={`/login`}>
            {" "}
            <p className="text-center font-bold text-xl">Sign in</p>
          </Link>
        </div>
      )}
      {notfound ? (
        <div className="flex px-1.5">
          <p className="items-center text-center text-xl sm:text-3xl mx-auto">
            No items match your search. Try again
          </p>
        </div>
      ) : (
        <div className="grid drag py-10 grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-2 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {galleryImages.map((image, index) => {
            return (
              <img
                key={image.id}
                draggable={user ? true : false}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                src={image.img}
                className=" rounded-2xl w-full bg-cover bg-center bg-no-repeat h-[20em] m-auto"
                alt=""
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Library;
