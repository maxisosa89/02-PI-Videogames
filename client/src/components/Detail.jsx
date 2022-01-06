import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './styles/Detail.module.css'

export default function Detail(){
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(id))
    }, [id, dispatch])
    const myVideogame = useSelector((state)=> state.detail)
    return (
        <div className={styles.containerGlobalDetail}>
            <nav className={styles.navDetail}>
                <Link to='/' className={styles.containerTitleDetail}><h1 className={styles.titleDetail}>Videogames</h1></Link>
                <Link to='/home'><button className={styles.btnDetail}>Go Home</button></Link>
            </nav>
            <div className={styles.containerInfoDetail}>
                {
                    Object.values(myVideogame).length > 0 ?
                    <div className={styles.containerVideogame}>
                        <div className={styles.containerImgDetail}>
                            <img src={myVideogame.background_image ? myVideogame.background_image : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt="not found" className={styles.imgDetail} />
                        </div>
                        <div className={styles.containerNamesDetail}>
                            <h1 className={styles.titleNameDetail}>{myVideogame.name}</h1>
                            <h3>Released: {myVideogame.released ? myVideogame.released : "Not released"}</h3>
                            <h3>Rating: {myVideogame.rating ? myVideogame.rating : "0.00"}</h3>
                            <h3>Genres: {myVideogame.genres ? myVideogame.genres.map(e => e.name + ". ") : "Not genres"}</h3>
                            <h3>Platforms: {myVideogame.db ?
                                myVideogame.platforms.map(e => e + ". ")
                                :
                                myVideogame.platforms.map(e => e.platform.name + ". ")}</h3>
                        </div>
                        <div className={styles.containerDescription}>
                            <h3>Description:</h3>
                            <p dangerouslySetInnerHTML={{ __html: myVideogame.description}}/>
                        </div>
                    </div>
                    : <p>Loading...</p>
                }
            </div>
        </div>
    )
}