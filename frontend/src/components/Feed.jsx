import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  // console.log(useLocation());
  const { state } = useLocation();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        // setPins(data);
        if (state) {
          const pinss = [...data];
          pins.filter((pin) => {
            console.log(pin._id, state._id, "a");
            return state._id !== pin._id;
          });
          setPins([state, ...pinss]);
        } else {
          setPins(data);
        }
        // console.log(state, "state");
        // console.log(data, "data");
        // console.log(data);
        // setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  // useEffect(() => {
  //   const query = '*[_type == "pin" ]';
  //   client.listen(query).subscribe((update) => {
  //     const newPins = update.result;
  //     console.log(newPins);
  //     setpins((pins) => {
  //       return [...pins, newPins];
  //     });
  //   });
  // }, []);
  // useEffect(() => {
  //   const query = '*[_type == "pin"] ';

  //   client.listen(query).subscribe((update) => {
  //     const comment = update.result;
  //     // console.log(comment, "update");
  //   });
  // }, []);
  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  // console.log(pins);
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
