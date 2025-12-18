import { useEffect, useState } from "react";

const useOnlineStatus = () =>{
    
const [onlineStatus,setOnlineStatus] = useState(true)
  useEffect(()=>{
    window.addEventListener("offline",()=>{
        console.log("Went offline");
      setOnlineStatus(false)
    })

     window.addEventListener("online",()=>{
      setOnlineStatus(true)
    })
  },[])
  
return onlineStatus;
}

export default useOnlineStatus;
