import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listofrestaurants, setListofrestaurants] = useState([]);
  const [filteredRestaurant, setFiltereRestaurnt] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
  console.log(listofrestaurants)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const data = await fetch("https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.1562124&lng=77.6261379&collection=83649&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null")
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.1562124&lng=77.6261379&collection=83645&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    // const data = await fetch("https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.1562124&lng=77.6261379&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    const json = await data.json();
    console.log(data);
    console.log(json);
    setListofrestaurants(json?.data?.cards);
    setFiltereRestaurnt(json?.data?.cards);

    // setListofrestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // setFiltereRestaurnt(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlinestatus = useOnlineStatus();
  if (onlinestatus === false)
    return (
      <h1>Looks like you're offline. Please check your internet connection</h1>
    );

  // if(listofrestaurants.length ===0){
  //   return <Shimmer />
  // }

  return listofrestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchtext}
            onChange={(e) => {
              setSearchtext(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 m-4 bg-green-100 rounded-lg cursor-pointer"
            onClick={() => {
              console.log(searchtext);
              const filteredRestaurant = listofrestaurants.filter((res) =>
                // res.data.card[3].info.name(searchtext)
                res?.card?.card?.info?.name
                  .toLowerCase()
                  .includes(searchtext.toLowerCase())
              );
              setFiltereRestaurnt(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="filter-btn px-4 py-2 bg-gray-100 rounded-lg cursor-pointer
            "
            onClick={() => {
              const filteredList = listofrestaurants.filter(
                (res) => res?.card?.card?.info?.avgRating > 4
              );
              // console.log(resList);
              setListofrestaurants(filteredList);
            }}
          >
            Top rated Restaurants
          </button>
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurant.map((Restaurant, index) => (
          
          <Link
            key={Restaurant?.card?.card?.info?.id || index}
            to={"/restaurants/" + Restaurant?.card?.card?.info?.id}
          >
            {Restaurant?.card?.card?.info?.promoted ?
             (<RestaurantCardPromoted resData={Restaurant} />) : (  <RestaurantCard resData={Restaurant} />)

            }
          {" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
