import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {ArrowLeftIcon} from '@primer/octicons-react'
import styles from './styles/Detail.module.css'

export default function Detail(){
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(id))
    }, [id, dispatch])
    const myVideogame = useSelector((state)=> state.detail)
    const containerGlobalDetail = `${styles.containerGlobalDetail}`
    return (
        <div className={containerGlobalDetail}>
            
            <nav className="navbar fixed-top navbar-dark justify-content-center" style={{backgroundColor: "#000a12"}}>

                <Link to='/home'><button className="btn btn-dark"><ArrowLeftIcon size={24} /></button></Link>
            </nav>
            
            <div className="container" style={{paddingTop: "70px", paddingBottom: "15px"}}>
                <div className={styles.containerInfoDetail} >
                    {
                        Object.values(myVideogame).length > 0 ?
                        <div className="row justify-content-center rounded" style={{backgroundColor: "#263238"}}>
                            <div className="col-12 text-center" style={{paddingTop: "15px", paddingBottom: "15px"}}>
                                <h1 className={styles.titleNameDetail}>{myVideogame.name}</h1>
                            </div>
                            <div className="row col-12 ">
                                <div className="col-md-6 col-sm-12">
                                    <img src={myVideogame.background_image ? myVideogame.background_image : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt="not found" className={`rounded  ${styles.imgDetail}`} />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <h4><b>Released:</b> {myVideogame.released ? myVideogame.released : "Not released"}</h4>
                                    <h4><b>Rating:</b> {myVideogame.rating ? myVideogame.rating : "0.00"}</h4>
                                    <h4><b>Genres:</b> {myVideogame.genres ? myVideogame.genres.map(e => e.name + ". ") : "Not genres"}</h4>
                                    <h4><b>Platforms:</b> {myVideogame.db ?
                                        myVideogame.platforms.map(e => e + ". ")
                                        :
                                        myVideogame.platforms.map(e => e.platform.name + ". ")}</h4>
                                </div>
                            </div>
                            
                            
                            <div className="row col-12 " style={{marginTop: "20px"}} >
                                <h4><b>Description:</b></h4>
                                <p dangerouslySetInnerHTML={{ __html: myVideogame.description}}/>
                            </div>
                        </div>
                        : 
                        <div className="text-center" style={{ marginTop:"200px", paddingBottom:"200px"}}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}