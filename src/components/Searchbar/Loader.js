import React, { Component } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Spinner extends Component {
    //other logic
    render() {
        return (
            <Loader
                type="ThreeDots"
                color="#3f51b5"
                height={80}
                width={80}
                timeout={3000} //3 secs
            />
        );
    }
}

export default Spinner