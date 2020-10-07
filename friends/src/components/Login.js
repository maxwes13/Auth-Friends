import React from "react";

import { axiosWithAuth } from "../utils/axios";
import Friends from "./Friends";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: "",
        },
    
    }


    handleChange = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name] : e.target.value
            }
        })
    }

    login = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .post("/login", this.state.credentials)
        .then((res) => {
            localStorage.setItem("token", res.data.payload)
            this.props.history.push("/friends")
        })
        .catch((err) => {
            console.log("Err in Login.js is: ", err);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.login}>
                    <TextField
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                        />
                    <TextField
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                        />
                    <Button variant="contained" color="secondary">Log in</Button>
                </form>
            </div>
        )
    }
}

export default Login;