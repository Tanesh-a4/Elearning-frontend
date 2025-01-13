import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Pass query to the parent component
  };

  // Inline styles
  const inputStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "300px",
    marginRight: "10px",
    outline: "none",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#006400", // Dark green
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#004d00", // Darker green for hover
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for courses"
        style={inputStyle}
      />
      <button
        type="submit"
        className="search-btn"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
