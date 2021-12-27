import React from "react";

export default function Card({ name, rating, background_image, genres }){

    return (
        <div>
            <div>
                <img src={background_image} alt="Not found" />
            </div>
            <div>
                <div>
                    <h3>{name}</h3>
                </div>
                <div>
                    <h3>rating:</h3>
                    <h3>{rating}</h3>
                    <h3>genres:</h3>
                    <h3>{genres}</h3>
                </div>
            </div>
        </div>
    )
}