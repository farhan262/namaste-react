import {CDN_URL} from "../utils/constants"

const RestaurantCard = (props) => {
    const { resData } = props;
    const info = resData?.card?.card?.info;
if (!info) return null;
    const {cloudinaryImageId, name, cuisines, avgRating, costForTwo} =info;
    
    return (
      <div className="res-card m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200" >
        <img
          className="res-logo rounded-lg" 
          src={ CDN_URL
            +
           cloudinaryImageId
          }
          alt="res-logo"
        />
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{resData?.card?.card?.info?.sla?.deliveryTime} minutes</h4>
      </div>
    );
  };

  export const withPromotedLabel = (RestaurantCard)=>{
   return (props) =>{
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
    )
   }
  }

  export default RestaurantCard;

