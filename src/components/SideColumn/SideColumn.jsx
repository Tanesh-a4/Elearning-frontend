import React from "react";
import "./SideColumn.css";
import { useNavigate } from "react-router-dom";

const SideColumn = ({ filters, setFilters }) => {
  const navigate = useNavigate();

  // Handler for checkbox changes
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[type].includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type].push(value);
      }
      return updated;
    });
  };

  // Handler for range filters (price and duration)
  const handleRangeChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="SideColumn">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className="filter-group">
        <h4>Category</h4>
        <label>
          <input
            type="checkbox"
            value="Web Development"
            onChange={() => handleCheckboxChange("category", "Web Development")}
          />
          Web Development
        </label>
        <label>
          <input
            type="checkbox"
            value="Data Science"
            onChange={() => handleCheckboxChange("category", "Data Science")}
          />
          Data Science
        </label>
        <label>
          <input
            type="checkbox"
            value="Artificial Intelligence"
            onChange={() => handleCheckboxChange("category", "Artificial Intelligence")}
          />
          Artificial Intelligence
        </label>
      </div>
      {/* Price Filter */}
      <div className="filter-group">
        <h4>Price Range</h4>
        <select
          onChange={(e) => handleRangeChange("priceRange", e.target.value)}
        >
          <option value="">Select</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-5000">₹1000 - ₹5000</option>
        </select>
      </div>

      {/* Duration Filter */}
      <div className="filter-group">
        <h4>Duration (Weeks)</h4>
        <select
          onChange={(e) => handleRangeChange("duration", e.target.value)}
        >
          <option value="">Select</option>
          <option value="0-4">0 - 4 weeks</option>
          <option value="4-8">4 - 8 weeks</option>
          <option value="8-12">8 - 12 weeks</option>
        </select>
      </div>

      {/* Cart Button */}
      
    </div>
  );
};

export default SideColumn;