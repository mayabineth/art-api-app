import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Paintings = () => {
  const { paintings, isLoading } = useGlobalContext();
  if (isLoading) return <div className="loading"></div>;

  return (
    <section className="paintings">
      {paintings.map((painting) => {
        const {
          artist_title: artist,
          image_id: image,
          id: idN,
          title: titleN,
          date_end: date,
        } = painting;
        const picture = `https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg`;
        return (
          <Link to={`/paintings/${idN}`} key={idN} className="painting">
            <article>
              <img
                className="img"
                src={picture === null ? url : picture}
                alt={titleN}
              />
              <div className="painting-info">
                <h4 className="title">{titleN}</h4>
                <h4>{artist}</h4>
                <p className="year">{date}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Paintings;
