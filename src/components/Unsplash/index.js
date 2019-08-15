import { useEffect, useState } from "react";
import Unsplash from "unsplash-js";

import keys from "./keys.json";

const unsplash = new Unsplash({
  applicationId: keys.unsplash.key,
  secret: keys.unsplash.secret
});

const fetchUnsplash = (search, onComplete) => {
  unsplash.search
    .photos(search, 1)
    .then(v => v.json())
    .then(json => {
      onComplete && onComplete(json);
    });
};

const Search = ({ search, onComplete }) => {
  useEffect(() => {
    fetchUnsplash(search, onComplete);
  }, [search]); // only fetches on keyword change

  return null;
};

export const useUnsplash = search => {
  const [data, setData] = useState({});
  const handleComplete = v => setData(v);
  useEffect(() => {
    fetchUnsplash(search, handleComplete);
  }, [search]);

  return data;
};

export const urls = search => {
  let prevSearch;
  let cache = [];

  const fetchData = async () => {
    // console.log("current cache: ", cache.map(v => v.id));
    if (cache.length === 0 || prevSearch !== search) {
      // console.log("performing new fetch!");
      try {
        const res = await unsplash.search.photos(search, 1);
        const resJson = await res.json();
        const results = resJson.results;

        if (results && results.length > 0) {
          // console.log("caahing!");
          cache = results;
          prevSearch = search;
        } else {
          // empty search
          return "";
        }

        const out = cache.shift();
        return out.urls.regular;
      } catch (e) {
        console.error("unsplash fetching error: ", e);
        return "";
      }
    } else {
      // console.log("reutrning cached!");
      const out = cache.shift();
      return out.urls.regular;
    }
  };

  // warm up cache on init
  fetchData();

  return fetchData;
};

export default Search;
