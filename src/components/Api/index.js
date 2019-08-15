import { useState, useEffect, useReducer } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// grouped state
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error(
        "ERROR: in useFetch: dunno what to do with this condition"
      );
  }
};

const useFetch = (initialUrl, initialData, type) => {
  const [url, setUrl] = useState(initialUrl);
  const [postData, setPostData] = useState(initialData || {});
  const [state, dispatch] = useReducer(dataFetchReducer, {
    // dataFetchReducer is the action
    // this here is the initial state
    isLoading: false,
    error: "",
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        let result;
        if (type === "POST") {
          // console.log("calling!", url, postData);
          result = await axios.post(url, postData);
        } else if (type === "GET") {
          result = await axios(url);
        } else {
          result = await axios(url);
        }

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE", payload: e.message });
        }
      }
    };

    fetchData();

    return () => {
      // if it unmounts, this returns true
      // thereby skipping FETCH_SUCCESS / FETCH_FAILURE
      didCancel = true;
    };
  }, [url, postData, type]);

  const doFetch = async (url, postData, force) => {
    if (force) {
      setUrl("");
      await sleep(500);
    }
    if (type === "POST") {
      // console.log("post type!");
      setPostData(postData);
      setUrl(url);
    } else if (type === "GET") {
      setUrl(url);
    } else {
      setUrl(url);
    }
  };

  return [state, doFetch];
};

useFetch.propTypes = {
  initialUrl: PropTypes.string.isRequired,
  initialData: PropTypes.any.isRequired
};

export default useFetch;
