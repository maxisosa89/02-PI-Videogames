import React, { useEffect } from "react";
import styles from './styles/Paged.module.css'

export default function Paged ({videogamesPerPage, allVideogames, paged, pagedPrev, pagedNext, currentPage}) {
    const pageNumber = []
    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumber.push(i+1)
    }

    useEffect(()=>{
        document.getElementById(currentPage)?.classList.add("active")
    },[pageNumber])
    return (
        <div>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="page-link" aria-label="Previous" onClick={() => pagedPrev()} style={{backgroundColor:"#263238", color: "#ffffff"}}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {
                    pageNumber && pageNumber.map( el => (
                        <li key={el} className="page-item" id={el}>
                            <button onClick={() => paged(el, pageNumber)} className="page-link" style={{backgroundColor:"#263238", color: "#ffffff"}}>{el}</button>
                        </li>
                    ))
                    
                }
                <li className="page-item">
                    <button className="page-link" aria-label="Next" onClick={() => pagedNext(pageNumber.length)} style={{backgroundColor:"#263238", color: "#ffffff"}}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}