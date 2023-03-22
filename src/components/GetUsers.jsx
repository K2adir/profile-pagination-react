import React, { useState, useEffect } from "react";
import "./GetUsers.css";
const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  /// fetch users
  const fetchData = async () => {
    const url = `https://randomuser.me/api/?page=${page}&results=10&seed=abc`;

    const res = await fetch(url);
    const users = await res.json();
    setUsers(users.results);
    console.log(users.results);
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  //// fetch user
  //
  //

  return (
    <>
      <div className="container">
        {users.map(
          ({
            name: { first, last },
            login: { uuid },
            picture: { large },
            location: { street, city, state, country, postcode },
            email,
            login: { username },
          }) => {
            let countryLowercase;
            if (country === "United States") {
              countryLowercase = "united-states-of-america";
            } else if (country === "United Kingdom") {
              countryLowercase = "united-kingdom";
            } else {
              countryLowercase = country.toLowerCase();
            }

            return (
              <div className="profile__card" key={uuid}>
                <img className="profile__pic" src={large} alt="" />
                <div>
                  <h1>
                    {first} {last}
                  </h1>
                  <h2>@{username}</h2>
                  <h3>{email}</h3>

                  <p>
                    {city}, {state}
                  </p>
                  <div className="profile__country">
                    <img
                      src={`https://cdn.countryflags.com/thumbs/${countryLowercase}/flag-400.png`}
                      className="flag"
                    />
                    <p>{country}</p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <button
        onClick={(e) => {
          const prevPage = page - 1;
          prevPage >= 1 ? setPage(prevPage) : setPage(setPage);
        }}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button
        onClick={(e) => {
          const nextPage = page + 1;
          setPage(nextPage);
        }}
      >
        Next Page
        {console.log(page)}
      </button>
    </>
  );
};

export default GetUsers;
