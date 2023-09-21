import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import PropTypes from "prop-types";

const Imagecomponent = ({ src, draggable, alt }) => {
  const [imgloaded, setImgLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      {!imgloaded && (
        <Blurhash
          hash="LOI59}0JV[xa~qjEIoxuEgMd%MkW"
          width="100%"
          height="20em"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      {imgloaded && (
        <img
          draggable={draggable}
          alt={alt}
          className="skeleton rounded-2xl w-full bg-cover bg-center bg-no-repeat h-[20em] m-auto"
          src={src}
        />
      )}
    </>
  );
};

export default Imagecomponent;

Imagecomponent.propTypes = {
  src: PropTypes.node,
  alt: PropTypes.string,
  draggable: PropTypes.func,
};
