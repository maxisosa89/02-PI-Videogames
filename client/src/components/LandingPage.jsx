import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className="m-0 vh-100 row justify-content-center align-items-center">
            <div className="col-auto p-5 text-center rounded" style={{width: "80%", height: "80%", backgroundColor: "#000a12"}}>
                    
                <div className="m-0 row justify-content-center align-items-center">
                    <div className="col-12 row p-5 text-center" style={{height: "400px"}}>
                        <div className="col-12 text-center">
                            <h1 className={styles.titleLanding}>Welcome to<br />Videogames</h1>
                        </div>
                        <div className="col-12">
                            <Link to = '/home'>
                                <button className="btn btn-dark btn-lg">Enter!</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}