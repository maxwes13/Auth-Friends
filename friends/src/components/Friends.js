import React from "react";
import { axiosWithAuth } from "../utils/axios";
import NewFriend from "../components/AddNewFriend";

class Friends extends React.Component {
    state = {
        friends: []
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axiosWithAuth()
        .get("/friends")
        .then(res => {
            console.log("RES: ", res)
            this.setState({
                friends: res.data
            })

        })
        .catch(err => {
            console.log("Friends Err is: ", err)
        })

        console.log(this.friends);
    }

 

    render() {
        return (
            <div>
                <div>
                <h1>Friends List</h1>
                {this.props.fetchingData && (
          <div>
            
            <p>Loading Data</p>
                </div>)}
                </div>
              {this.state.friends.map((friend) => (
                  <div>
                                <p>{friend.name}</p>
                                <p>{friend.age}</p>
                                <p>{friend.email}</p>
                                </div>
                            
                        ))}
                        <div>
                            <NewFriend />
                        </div>
                      
                

            </div>
            
        )
    }
}

export default Friends;