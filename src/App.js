
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function App() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");

//   useEffect(() => {
//     axios
//       .get("https://crio-location-selector.onrender.com/countries")
//       .then((response) => {
//         setCountries(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       axios
//         .get(
//           `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
//         )
//         .then((response) => {
//           setStates(response.data);
//           setSelectedState("");
//           setCities([]);
//           setSelectedCity("");
//         })
//         .catch((error) => {
//           console.error("Error fetching states:", error);
//         });
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       axios
//         .get(
//           ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
//         )
//         .then((response) => {
//           setCities(response.data);
//           setSelectedCity("");
//         })
//         .catch((error) => {
//           console.error("Error fetching cities:", error);
//         });
//     }
//   }, [selectedCountry, selectedState]);

//   return (
//     <div>
//       <h1>Select Location</h1>
//       <select
//         value={selectedCountry}
//         onChange={(e) => setSelectedCountry(e.target.value)}
//       >
//         <option value="" disabled>
//           Select Country
//         </option>
//         {countries.map((country) => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>
//       <select
//         value={selectedState}
//         onChange={(e) => setSelectedState(e.target.value)}
//       >
//         <option value="" disabled>
//           Select State
//         </option>
//         {states.map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>
      
//       <select
//         value={selectedCity}
//         onChange={(e) => setSelectedCity(e.target.value)}
//       >
//         <option value="" disabled>
//           Select City
//         </option>
//         {cities.map((city) => (
//           <option key={city} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>
//       <h3>{selectedCountry && selectedState && selectedCity && (
//   <h3>{`You selected ${selectedCountry}, ${selectedState}, ${selectedCity}`}</h3>
// )} </h3>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    setLoadingCountries(true);
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      })
      .finally(() => {
        setLoadingCountries(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setLoadingStates(true);
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => {
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        })
        .finally(() => {
          setLoadingStates(false);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setLoadingCities(true);
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        })
        .finally(() => {
          setLoadingCities(false);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div>
      <h1>Select Location</h1>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {loadingCountries ? (
          <option disabled>Loading countries...</option>
        ) : (
          countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))
        )}
      </select>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="" disabled>
          Select State
        </option>
        {loadingStates ? (
          <option disabled>Loading states...</option>
        ) : (
          states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))
        )}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="" disabled>
          Select City
        </option>
        {loadingCities ? (
          <option disabled>Loading cities...</option>
        ) : (
          cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))
        )}
      </select>

      <h3>
        {selectedCountry && selectedState && selectedCity && (
          <h3>{`You selected ${selectedCountry}, ${selectedState}, ${selectedCity}`}</h3>
        )}
      </h3>
    </div>
  );
}

