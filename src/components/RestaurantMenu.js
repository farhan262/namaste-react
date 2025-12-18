// import { useEffect, useState } from "react";
import useRestauarantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

// import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  
  const {resId} = useParams()
  const resInfo = useRestauarantMenu(resId)
  // console.log(params)

  // useEffect(() => {
  //   fetchMenu();
  // }, []);


  // const fetchMenu = async () => {
  //   // const data = await fetch( "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.1562124&lng=77.6261379&restaurantId=&catalog_qa=undefined&query=North%20Indian&submitAction=ENTER"
  //   // );
  //   const data = await fetch( MENU_API + resId)
  //   // "&catalog_qa=undefined&query=North%20Indian&submitAction=ENTER"
  //   const json = await data.json();
  //   console.log(json);
  //   setResInfo(json.data);
  // };
  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || [];
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || [];
  console.log(itemCards);

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(",")} - {costForTwoMessage}
      </p>

      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>{item.card.info.name} -{"Rs."}
          {item.card.info.price/100  || item.card.info.defaultPrice/100}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RestaurantMenu;



