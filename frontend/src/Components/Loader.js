import React from 'react'
import ReactLoading from 'react-loading'

export default function Loader() {
    return (
        <div className = "loader">
        <ReactLoading 
        type = {"spinningBubbles"}
        color = {"white"}
        height = {200}
        width = {200}
        />
        </div>
    )
}
