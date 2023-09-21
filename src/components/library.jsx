import { useEffect, useRef, useState } from "react";
import { images } from "./imagedata";
import { MdMenu, MdClose } from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/authcontext";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import { supabase } from "../../client";
import { gsap } from "gsap";
import Animatedintro from "./animatedintro";
import Sortable from "sortablejs";
import { useAuth } from "../context/useAuth";

const Library = () => {
  const [galleryImages, setGalleryImages] = useState(images);
  const [tag, setTag] = useState("");
  const [menutoggle, setMenuToggle] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notfound, setNotFound] = useState(false);

  const splitRef = useRef(null);
  const preloaderRef = useRef(null);
  const gridRef = useRef(null);
  const sortableJsRef = useRef(null);

  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setMenuToggle(false);
        sessionStorage.removeItem("user_data");
        window.location.reload(); // Temporal fix to stop the login page from flickering after signout :)
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during sign-out.");
      setLoading(false);
    } finally {
      setError("");
      setLoading(false);
      e.preventDefault();
    }
  };

  const onListChange = () => {
    const newData = [...gridRef.current.children]
      .map((i) => i.dataset.id)
      .map((id) => galleryImages.find((item) => item._id === id));

    sessionStorage.setItem("my-grid", JSON.stringify(newData));
    setGalleryImages(galleryImages);
  };

  useEffect(() => {
    if (sortableJsRef.current) {
      sortableJsRef.current.destroy(); // Destroy the sortable when not signed in
    }

    if (user) {
      sortableJsRef.current = new Sortable(gridRef.current, {
        animation: 150,
        onEnd: onListChange,
      });
    }
  }, [user]);

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

  useEffect(() => {
    const split = splitRef.current;
    const preloader = preloaderRef.current;

    gsap.fromTo(
      preloader,
      { opacity: 1 },
      {
        duration: 2,
        opacity: 0,
        delay: 3.5,
        onComplete: () => {
          preloader.style.display = "none";
        },
      }
    );

    gsap.fromTo(
      split,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scaleX: 1,
        duration: 1.5,
        delay: 2,
      }
    );
  }, []);

  return (
    <>
      <div id="library" className="px-3 relative sm:px-5">
        {error && (
          <Alert className="rounded-lg text-black" status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="relative mb-48">
          <div
            className={`flex justify-evenly w-full overflow-hidden fixed left-0 z-10 bg-black sm:bg-transparent items-center`}
          >
            <form
              action="search"
              onClick={handleSearch}
              className="flex flex-[0.8_1_0] justify-center py-8 gap-x-1.5 items-center"
            >
              <input
                type="text"
                value={tag}
                className="w-full placeholder:text-white p-3 bg-transparent border rounded-lg"
                name="text"
                id="text"
                placeholder="Search and filter by tags"
                onChange={(e) => setTag(e.target.value)}
              />
              <button className="bg-white hover:scale-[1.1] transition-all ease-in-out duration-300 py-3 px-3 text-black rounded-lg">
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
                  <BiLoader
                    id="loader"
                    className="m-auto"
                    color="white"
                    size={20}
                  />
                ) : (
                  "Sign Out"
                )}
              </button>
            ) : (
              <Link to={`/login`}>
                <button className="hidden hover:scale-[1.1] transition-all ease-in-out duration-300 border p-3 rounded-lg sm:block">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>

        {menutoggle && (
          <div
            id="navbar"
            className={`absolute rounded-b-[2em] p-6 w-full flex sm:hidden left-0 top-[-22em] flex-col gap-y-10 bg-black text-white h-2/4 transition-transform ${
              menutoggle ? "#navbar active" : "#navbar"
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
            {user ? (
              <button
                className="py-2 text-xl rounded-lg border"
                onClick={handleLogout}
              >
                {loading ? (
                  <BiLoader
                    id="loader"
                    className="m-auto"
                    color="white"
                    size={20}
                  />
                ) : (
                  "Sign Out"
                )}
              </button>
            ) : (
              <Link onClick={() => setMenuToggle(false)} to={`/login`}>
                {" "}
                <p className="text-center rounded-lg border py-2 text-xl">
                  Sign in
                </p>
              </Link>
            )}
          </div>
        )}

        {user ? (
          <div className="flex px-1.5">
            <p className="items-center text-center text-xl sm:text-3xl mx-auto">
              Drag and drop images wherever you want :)
            </p>
          </div>
        ) : (
          <div className="flex px-1.5">
            <p className="items-center text-center text-xl sm:text-3xl mx-auto">
              You must be signed in to use the drag and drop feature :)
            </p>
          </div>
        )}

        {notfound ? (
          <div className="flex py-20 px-1.5">
            <p className="items-center border-b pb-1.5 text-center text-xl sm:text-3xl mx-auto">
              No items match your search. Try again
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid drag py-10 grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-2 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5"
          >
            {galleryImages.map((image) => (
              <div key={image.id} className="flex lg:hover:scale-[1.05] transition-all ease-in-out duration-300 gap-y-2 flex-col">
                <img
                  draggable={user ? true : false}
                  loading="lazy"
                  src={image.img}
                  className="skeleton rounded-2xl w-full bg-cover bg-red-700 bg-center bg-no-repeat h-[20em] m-auto"
                  alt={image.tags}
                />
                <p className="text-red-700">
                  TAGS: <span className="text-white">{image.tags}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        ref={preloaderRef}
        id="preloader"
        className="w-full h-full overflow-y-auto flex flex-column justify-center items-center gap-y-2 absolute top-0 left-0"
      >
        <div className="intro flex flex-col item-center">
          <Animatedintro text={`sheddy's`} />
          <p className="word"></p>

          <p
            ref={splitRef}
            className="text-center border-b pb-1 text-4xl sm:text-5xl"
          >
            drag &apos;n drop
          </p>
        </div>
      </div>
    </>
  );
};

export default Library;
