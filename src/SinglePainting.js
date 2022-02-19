import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SinglePainting = () => {
  const { id } = useParams();
  const [painting, setPainting] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchPainting = async (url) => {
    const response = await fetch(url); //change url in page
    const data = await response.json();
    setPainting(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPainting(`${API_ENDPOINT}${id}`);
  }, [id]);

  if (isLoading) return <div className="loading"></div>;

  const {
    id: idN,
    artist_title: artist,
    image_id: image,
    title: titleN,
    date_end: date,
    thumbnail: info,
    place_of_origin: place,
    dimensions: dimension,
    medium_display: medium,
  } = painting;
  const poster = `https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg`;

  return (
    <section className="single-painting">
      <img src={poster === null ? url : poster} alt={titleN} />
      <div className="single-painting-info">
        <h2>{titleN}</h2>
        <p>{info.alt_text}</p>
        <h4>Artist: {artist}</h4>
        <h4>Year: {date}</h4>
        <h4>Dimensions: {dimension}</h4>
        <h4>Type: {medium}</h4>

        <Link to="/" className="btn">
          back to art pieces
        </Link>
      </div>
    </section>
  );
};
export default SinglePainting;
