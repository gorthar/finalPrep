import { NavLink } from "react-router-dom";

export default function NavBar({
  searchText,
  setSearchText,
  setFetchedDataCount,
}) {
  console.log(searchText);
  function handleChange(value) {
    setSearchText(value);
  }
  function populateDb() {
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then(
        (data) =>
          console.log(data.results) ||
          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data.results),
          })
      );
    setFetchedDataCount((prev) => prev + 50);
  }
  function deleteUser(id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
  }
  return (
    <div className=" w-full border-gray-400 border-2 rounded-md ">
      <div className="flex flex-row justify-between items-center p-4">
        <div className="flex items-center justify-center">
          <img
            src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png"
            alt="logo"
            className="h-16 w-16 rounded-lg"
          />
        </div>
        {/** Search bar*/}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-200 rounded-md p-2 text-gray-700 w-96 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out transform hover:scale-105"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <NavLink
            to={"/"}
            className="text-gray-300 hover:text-gray-100 hover:scale-105 ease-in-out transform transition-all duration-100"
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className="text-gray-300  hover:text-gray-100 hover:scale-105 ease-in-out transform transition-all duration-100"
          >
            About
          </NavLink>
          <a
            href="#"
            className="text-gray-300  hover:text-gray-100 hover:scale-105 ease-in-out transform transition-all duration-100"
          >
            Contact
          </a>
          <button
            href="#"
            className="text-gray-300  hover:text-gray-100 hover:scale-105 ease-in-out transform transition-all duration-100"
            onClick={populateDb}
          >
            GetUsers
          </button>
        </div>
      </div>
    </div>
  );
}
