import React from "react";
import styles from './styles/Card.module.css'

export default function Card({ name, rating, background_image, genres }){
    const styleDivGlobal = `container rounded ${styles.globalCard}`
    return (
        <div className={styleDivGlobal} >
            <div className="row">
                <div className="col-12 containerImg">
                    <img src={background_image ? background_image : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt="Not found" className={`rounded ${styles.imgHome}`}/>
                </div>
                <div className="col-12">
                    <h4 >{name}</h4>
                </div>
                <div className="col-12 " style={{marginTop:"5px"}}>
                <div className="col-12 ">
                    <div className="col-12 " >
                        <ul className="list-unstyled list-inline">
                            {   
                                genres?.map(e => (
                                <li className="list-inline-item" key={e.name}>{e.name}. </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-12 " style={{marginBottom:"15px"}}>
                        <span >{rating ? rating : "0.00"}</span>
                </div>

                </div>  
            </div>
        </div>
    )
}