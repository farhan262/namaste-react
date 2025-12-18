import React from "react";
class UserClass extends React.Component {
  constructor(props){
    super();
    console.log(props)
    this.state ={
      userInfo:{
        name: "dummy",
        location:"default",

      }
    }
  }
    
    async componentDidMount() {
      const data = await fetch("https://api.github.com/users/farhan262")
      const json = await data.json()
     
      this.setState({
        userInfo:json,
      })
       console.log(json)
    }
       componentDidUpdate(){
        console.log("updated")

       }

    componentWillUnmount(){
      console.log("will unmount")
    }

  
  render() {
    const {name,location,avatar_url} = this.state.userInfo ;
    return (
      <div className="user-card">
        <img src="avatar_url"/>
                <h2>Name : {name}</h2>
        <h3>Location: {location}</h3>
        <h4>github</h4>
      </div>
    );
  }

}
export default UserClass;
