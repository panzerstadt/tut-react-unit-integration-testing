import React from "react";

import useFetch from "../Api";

// allows you to post anything and have it reflected back
const URL = "https://httpbin.org/anything";

const props = {
  comments: [
    {
      id: 1,
      comment: "The Way Get Started Is To Quit Talking And Begin Doing.",
      author: "Walt Disney"
    },
    {
      id: 2,
      comment:
        "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.",
      author: "Winston Churchill"
    },
    {
      id: 3,
      comment: "Don’t Let Yesterday Take Up Too Much Of Today.",
      author: "Will Rogers"
    }
  ]
};

const useFetchDummy = () => {
  const [state, doFetch] = useFetch(URL, { ...props }, "POST");
  return state;
};

export default useFetchDummy;
