import React from "react";
import styles from './styles/Card.module.css'

export default function Card({ name, rating, background_image, genres }){

    return (
        <div className={styles.containerGlobalCard}>
            <div className={styles.containerImgCard}>
                <img src={background_image ? background_image : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt="Not found" className={styles.imgCard}/>
            </div>
            <div className={styles.containerTextCard}>
                <div className={styles.containerNicknameCard}>
                    <h3 className={styles.h3Card}>{name}</h3>
                </div>
                <div className={styles.containerStatusCard}>
                    <h3 className={styles.h3Card}>Rating:</h3>
                    <h3 className={styles.h3Card}>{rating ? rating : "0.00"}</h3>
                    <h3 className={styles.h3Card}>Genres:</h3>
                    <h3 className={styles.h3Card}>{genres ? genres : "Not genres"}</h3>
                </div>
            </div>
        </div>
    )
}