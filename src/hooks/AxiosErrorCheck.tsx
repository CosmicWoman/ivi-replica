import React from 'react';
import axios from "axios";

function AxiosErrorCheck(request: string) {
    let errorAxios
    let errorAxiosName

    axios.get(`http://localhost:5000/${request}`)
        .catch(function (error) {
            errorAxiosName = error.toJSON().name
        })
    if (errorAxiosName == "AxiosError") {
        errorAxios = true
    } else {
        errorAxios = false
    }
    return errorAxios
}


export default AxiosErrorCheck;