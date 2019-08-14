import { useState, useEffect, useReducer } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

const DEFAULT_URL = "http://localhost:5000/";

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

const useFetch = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl || DEFAULT_URL);
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
        const result = await axios(url);
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
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return [state, doFetch];
};

useFetch.propTypes = {
  initialUrl: PropTypes.string.isRequired,
  initialData: PropTypes.any.isRequired
};

export default useFetch;
