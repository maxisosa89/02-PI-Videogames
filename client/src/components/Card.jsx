import React from "react";
import styles from './styles/Card.module.css'

export default function Card({ name, rating, background_image, genres }){
    const styleDivGlobal = `container ${styles.globalCard}`
    return (
        <div className={styleDivGlobal}>
            <div className="row row-eq-height">
                <div className="col-12">
                    <h3 >{name}</h3>
                </div>
                <div className="col-12 containerImg">
                    <img src={background_image ? background_image : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt="Not found" className=""/>
                </div>
                <div className="col-12 row justify-content-center m-0">
                    <div className="col-3">
                        <div className="col-12">
                            <h5 >Rating:</h5>
                        </div>
                        <div className="col-12">
                            <span >{rating ? rating : "0.00"}</span>
                        </div>
                        </div>
                    <div className="m-0 col-9">
                        <div className="col-12 text-center">
                            <h5 >Genres:</h5>
                        </div>
                        <div className="col-12">
                            <ul>
                                {   
                                    genres?.map(e => (
                                    <li key={e.name}>{e.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}