import React, { useState, useEffect } from "react";
import "./GetUsers.css";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const url = `https://randomuser.me/api/?page=${page}&results=10&seed=abc`;

    const res = await fetch(url);
    const users = await res.json();
    setUsers(users.results);
  };

  const formatCountryName = (country) => {
    let countryLowercase;
    if (country === "United States") {
      countryLowercase = "united-states-of-america";
    } else if (country === "United Kingdom") {
      countryLowercase = "united-kingdom";
    } else if (country === "New Zealand") {
      countryLowercase = "new-zealand";
    } else {
      countryLowercase = country.toLowerCase();
    }
    return countryLowercase;
  };

  const renderUser = ({
    name: { first, last },
    login: { uuid, username },
    picture: { large },
    location: { street, city, state, country, postcode },
    email,
  }) => {
    const countryLowercase = formatCountryName(country);

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
  };

  const renderUsers = () => {
    return users.map(renderUser);
  };

  return (
    <>
      <div className="container">{renderUsers()}</div>
      <button
        onClick={() => {
          const prevPage = page - 1;
          prevPage >= 1 ? setPage(prevPage) : setPage(setPage);
        }}
        disabled={page === 1}
      >
        Previous Page
      </button>

      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </>
  );
};

export default GetUsers;
