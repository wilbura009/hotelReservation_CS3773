import Axios from "axios";
import React, { useState, useEffect } from "react";
import _searchBar from "../components/searchBar";
import "../css/styles.css";
import {Amenity} from "../components/AmenityTable";
import { render } from "@testing-library/react";
import axios from "axios";
import { setConstantValue } from "typescript";
import "../pages/DayPicker.jsx";
import DatePicker from "../pages/DayPicker";

const Hotels = () => {
  const [input, setInput] = useState("");
  const [hotelListDefault, setHotelListDefault] = useState();
  const [hotelList, setHotelList] = useState([]);
  const [state, setState] = useState(null);
  const [filter, setFilter] = useState();


  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/api/get/hotels").then(
      (response) => {
        setHotelListDefault(response.data);
        setHotelList(response.data);
        setFilter(response.data);

      }
    );

  };

  const updateInput = async () => {
    setInput(document.getElementById("input").value);
    console.log("Got Here");
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.name.toLowerCase().includes(input.toLowerCase());
    });

    if (input === "") {
      setHotelList([]);
    } else {
      setHotelList(filtered);
    }
  };

  //Range Selector

 /* const [priceRange, setPriceRange] = useState({
   min: 0,
   max: "",
 });

 const handleRange = (e) => {
   const { name, value } = e.target;
   setPriceRange((prev) => {
     return {
       ...prev,
       [name]: value,
     };
   });
 };*/
 const standardPrice = () => {
  const filtered = hotelListDefault.filter((hotel) => {
        return hotel.standard_price <= 50;  
  });
  setHotelList(filtered);
}
const luxuryPrice = () => {
  const filtered = hotelListDefault.filter((hotel) => {
      return hotel.standard_price >= 100;
  });
  setHotelList(filtered);
}



// Pool chekced
const updatePool= async () => {
  const filtered = hotelListDefault.filter((hotel) => {
    return hotel.amenities & Amenity.POOL;
  });
    setHotelList(filtered); 
}
  
// Gym checked
  const updateGym = async () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.amenities & Amenity.GYM;
    });
      setHotelList(filtered);
  }

// Spa checked
const updateSpa= async () => {
  const filtered = hotelListDefault.filter((hotel) => {
    return hotel.amenities & Amenity.SPA;
  });
    setHotelList(filtered);
}

// Office checked
const updateOffice= async () => {
  const filtered = hotelListDefault.filter((hotel) => {
    return hotel.amenities & Amenity.OFFICE;
  });
    setHotelList(filtered);
}



  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <>

      <div className="search_section">
        <input className="searchBar" type="search" placeholder={"search hotel..."} id="input" onChange={updateInput} />
      <div className="container grid-2">
        <div className="column-1">
          <table>
            <tr>
          <td> 
            <label><input type="checkbox" rel="pool" onClick={updatePool}/> Pool</label></td>
          <td> 
          <label><input type="checkbox" rel="gym" onClick={updateGym}/> Gym</label></td> 
          <td> 
          <label><input type="checkbox" rel="spa" onClick={updateSpa}/> Spa</label></td> 
          <td> 
          <label><input type="checkbox" rel="office" onClick={updateOffice}/> Bussiness Office</label></td> 
            </tr>
          </table>
          <DatePicker/>
        </div>
        <div className="column-2">
          <h5>Hotel Reference</h5>
          <button className="btn" onClick={standardPrice}>Standard</button>
          <button className="btn" onClick={luxuryPrice}>Luxury</button>
        </div>




      </div>

      </div>
      
      {hotelList.map((val) => {
        return (
          <a
            href={"http://localhost:3000/hotels/" + val.id}
            style={{ textDecoration: "none" }}
            key={val.id}
          >
              <div className="hotels">
                      <h2><i class="fas fa-h-square"></i> {val.name}</h2>
                      <h2> from ${val.standard_price}</h2>
                        <h5>
                          {val.amenities & Amenity.POOL ? <i className="fas fa-water"> Pool </i>: ""}
                          {val.amenities & Amenity.GYM ? <i className="fas fa-dumbbell"> Gym </i> : ""}
                          {val.amenities & Amenity.SPA ? <i className="fas fa-spa"> Spa </i> : ""}
                          {val.amenities & Amenity.OFFICE ? <i className="fas fa-briefcase"> Business Office </i> : ""}
                        </h5>
     
              </div>
          </a>
        );
      })}
    </>
  );
};
export default Hotels;
