import React, { useState } from "react";

import MyNav from "./components/navigationBar/MyNav";
import Welcome from "./components/MainContent/Welcome/Welcome";
import LatestReleases from "./components/MainContent/LatestReleases/LatestReleases";
import MyFooter from "./components/MyFooter/MyFooter";

import { QueryContext } from "./context/QueryContext";

const App = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  return (
    <QueryContext.Provider
      value={{ query, setQuery, filteredBooks, setFilteredBooks }}
    >
      <MyNav />
      <Welcome />
      <LatestReleases />
      <MyFooter />
    </QueryContext.Provider>
  );
};

export default App;