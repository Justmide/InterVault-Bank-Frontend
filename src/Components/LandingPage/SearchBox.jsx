import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [atms, setAtms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      const debounceTimer = setTimeout(() => {
        fetchCoordinates(query);
      }, 1500); // Auto-search after 1.5s

      return () => clearTimeout(debounceTimer);
    }
  }, [query]);

  const fetchCoordinates = async (city) => {
    setLoading(true);
    setError("");
    setAtms([]);

    try {
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
      const response = await axios.get(geocodeUrl);
      console.log("Geocode API Response:", response.data);

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        fetchATMs(parseFloat(lat), parseFloat(lon));
      } else {
        setError("Invalid location. Try another city.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setError("Failed to fetch coordinates.");
      setLoading(false);
    }
  };

  const fetchATMs = async (lat, lon) => {
    const offset = 0.2; // Increases search area to find ATMs
    const query = `[out:json];node["amenity"="atm"](${lat - offset},${lon - offset},${lat + offset},${lon + offset});out;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url);
      console.log("Overpass API Response:", response.data);

      if (response.data.elements.length > 0) {
        setAtms(response.data.elements);
      } else {
        setError("No ATMs found in this area.");
      }
    } catch (error) {
      console.error("Error fetching ATMs:", error);
      setError("Failed to fetch ATM locations.");
    }
    setLoading(false);
  };

  return (
    <StyledWrapper>
      <div className="ui-input-container">
        <input
          required
          placeholder="Type a city (e.g., Lagos, Abuja)"
          className="ui-input text-black backdrop-blur-[120px]"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="ui-input-underline" />
        <div className="ui-input-highlight" />
        <div className="ui-input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
          </svg>
        </div>
      </div>

      {loading && <p className="pt-4">🔄 Searching for ATMs...</p>}
      {error && <p className="error pt-4">❌ {error}</p>}

      <div className="atm-results">
        {atms.length > 0 ? (
          <ul>
            {atms.map((atm, index) => (
              <li key={index}>📍 ATM {index + 1} - Lat: {atm.lat}, Lng: {atm.lon}</li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>🔍Find Nearby ATMs...</p>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .ui-input-container {
    position: relative;
    width: 225px;
  }

  .ui-input {
    width: 100%;
    padding: 10px 10px 10px 40px;
    font-size: 1em;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    background-color: transparent;
    transition: border-color 0.3s;
  }

  .ui-input:focus {
    border-color: #6c63ff;
  }

  .ui-input-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #6c63ff;
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  .ui-input:focus + .ui-input-underline {
    transform: scaleX(1);
  }

  .ui-input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: rgba(108, 99, 255, 0.1);
    transition: width 0.3s;
  }

  .ui-input:focus ~ .ui-input-highlight {
    width: 100%;
  }

  .ui-input-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    transition: color 0.3s;
  }

  .ui-input:focus ~ .ui-input-icon {
    color: #6c63ff;
  }

  .ui-input-icon svg {
    width: 20px;
    height: 20px;
  }

  .atm-results {
    margin-top: 10px;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .atm-results ul {
    list-style: none;
    padding: 0;
  }

  .atm-results li {
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
`;

export default SearchBox;
