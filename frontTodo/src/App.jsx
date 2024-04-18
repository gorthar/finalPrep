import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Content from "./Content";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [searchText, setSearchText] = useState("");
  const [fetchedDataCount, setFetchedDataCount] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [fetchedDataCount]);

  return (
    <div>
      <BrowserRouter>
        <NavBar
          searchText={searchText}
          setSearchText={setSearchText}
          setFetchedDataCount={setFetchedDataCount}
        />
        <Content fetchedDataCount={fetchedDataCount} users={users} />
      </BrowserRouter>
    </div>
  );
}

export default App;
