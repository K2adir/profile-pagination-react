import React, { useState, useEffect } from "react";
import "./GetUsers.css";
const GetUsers = () => {
  const [users, setUsers] = useState([]);

  /// fetch users
  const fetchData = async () => {
    const url = `https://randomuser.me/api/?page=3&results=10&seed=abc
`;
    const res = await fetch(url);
    const users = await res.json();
    setUsers(users.results);
    console.log(users.results);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //// fetch user
  //
  //

  return (
    <>
      {users.map(
        ({
          name: { first, last },
          login: { uuid },
          picture: { large },
          location: { street, city, state, country, postcode },
        }) => {
          return (
            <div className="profile__card" key={uuid}>
              <img src={large} alt="" />
              <div>
                <p>
                  {first} {last}
                </p>

                <p>
                  {street.number} {street.name}
                </p>
                <p>
                  {city}, {state},{postcode}
                </p>
                <p> {country}</p>
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default GetUsers;
