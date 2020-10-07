import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const NewFriend = () => {

    const history = useHistory()

    const startingForm = {
        id: Date.now(),
        name: "",
        age: "",
        email: "",
    }

    const [newFriend, setNewFriend] = useState(startingForm);

    const handleChange = (e) => {
        e.persist()
        setNewFriend({
            ...newFriend,
            [e.target.name] : e.target.value
        })
    }

    const addNewFriend = (friend) => {
        axiosWithAuth()
        .post("/friends", friend)
        .then((res) => {
            console.log("New Friend added ", res.data)
            setNewFriend({
                ...newFriend,
                friend
            })
        })
        .catch((err) => {
            console.log("New Friend failed: ", err.message)
        })

    }

    const submitForm = (e) => {
        // e.preventDefault()
        console.log("form submitted")
        addNewFriend(newFriend)
        history.push("/friends")
        // setNewFriend(startingForm)
    }

    // useEffect(() => {

    // }, [friends])

    return (
                    <div>
                        <form onSubmit={submitForm}>
                            <TextField htmlFor="name"
                            id = "name"
                            name = "name"
                            type = "text"
                            placeholder = "Name"
                            value = {newFriend.name}
                            onChange = {handleChange}
                            />
        
                            <TextField htmlFor="age"
                            id = "age"
                            name = "age"
                            type = "number"
                            placeholder = "Age"
                            value = {newFriend.age}
                            onChange = {handleChange}
                            /> 
        
                            <TextField htmlFor="email"
                            id = "email"
                            name = "email"
                            type = "text"
                            placeholder = "Email"
                            value = {newFriend.email}
                            onChange = {handleChange}
                            />
        
                            <Button variant="contained" color="secondary">
                                Add a new friend
                            </Button>
                        </form>
                    </div>
                )


}

export default NewFriend;