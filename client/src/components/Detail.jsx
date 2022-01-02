import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Detail(){
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(id))
    }, [id, dispatch])
    const myVideogame = useSelector((state)=> state.detail)
    return (
        <div>
            <nav>
                <h1>Titulo</h1>
                <Link to='/home'>Go Home</Link>
            </nav>
            <div>
                {
                    Object.values(myVideogame).length > 0 ?
                    <div>
                        <h1>{myVideogame.name}</h1>
                        <img src={myVideogame.background_image} alt="not found" />
                        <h3>Released: {myVideogame.released}</h3>
                        <h3>Rating: {myVideogame.rating}</h3>
                        <h3>Genres: {myVideogame.genres.map(e => e.name + ". ")}</h3>
                        <h3>Platforms: {myVideogame.db ?
                            myVideogame.platforms.map(e => e + ". ")
                            :
                            myVideogame.platforms.map(e => e.platform.name + ". ")}</h3>
                        <h3>Description: <div dangerouslySetInnerHTML={{ __html: myVideogame.description}}/></h3>
                    </div>
                    : <p>Loading...</p>
                }
            </div>
        </div>
    )
}