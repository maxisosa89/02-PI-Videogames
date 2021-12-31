import React from "react";
import styles from './styles/Card.module.css'

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
                    <h3>Rating:</h3>
                    <h3>{rating}</h3>
                    <h3>Genres:</h3>
                    <h3>{genres}</h3>
                </div>
            </div>
        </div>
    )
}