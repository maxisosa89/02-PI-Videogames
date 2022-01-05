import React from "react";
import styles from './styles/Paged.module.css'

export default function Paged ({videogamesPerPage, allVideogames, paged}) {
    const pageNumber = []
    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumber.push(i+1)
    }
    return (
        <div>
            <ul>
                {
                    pageNumber && pageNumber.map( el => (
                        <li key={el} className={styles.liPaged}>
                            <button onClick={() => paged(el)} className={styles.btnPaged}>{el}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}