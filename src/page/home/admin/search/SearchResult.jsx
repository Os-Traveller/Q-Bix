import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverAddress } from "../../../../components/variables";
import Searchbox from "./Searchbox";
import SearchResultCard from "./SearchResultCard";

const SearchResult = () => {
  const { keyWord } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    let searchArr = keyWord.split(" ");
    searchArr = searchArr.filter((str) => str !== "" && str.length >= 3);
    const url = `${serverAddress}/search`;
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(searchArr),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => setResponse(res));
  }, [keyWord]);

  return (
    <section>
      <Searchbox />
      {/* response */}
      <div className="card mt-8 w-fit mx-auto">
        <h1>
          Search Result For : <span className="font-semibold text-xl">{keyWord}</span>{" "}
          {response.length === 0 && (
            <p className="mt-4 font-semibold text-center"> Nothing Found </p>
          )}
        </h1>
      </div>
      {response.length !== 0 && (
        <div>
          {/* wrapper of all result */}
          {/* name */}
          <div className="">
            <div className="grid grid-cols-3 gap-5 mt-4">
              {response.map((user, index) => (
                <SearchResultCard
                  key={index}
                  name={user.name}
                  id={user.id}
                  email={user.email}
                  dept={user.dept}
                  intake={user.intake}
                />
              ))}
            </div>
          </div>

          <div></div>
        </div>
      )}
    </section>
  );
};

export default SearchResult;
