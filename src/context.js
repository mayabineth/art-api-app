import React, { useState, useContext, useEffect } from "react";

export const API_ENDPOINT = `https://api.artic.edu/api/v1/artworks/`;
console.log(API_ENDPOINT);
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [paintings, setPaintings] = useState([]);
  const [query, setQuery] = useState("cat");

  const fetchPaintings = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data.length > 0) {
        setPaintings(data.data);
        console.log(data.data);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPaintings(
      `${API_ENDPOINT}search?q=${query}&limit=30&fields=id,title,image_id,date_end,artist_title,thumbnail`
    );
  }, [query]);
  return (
    <AppContext.Provider
      value={{ isLoading, error, paintings, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
