import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from "../actions/index";
import { Link } from 'react-router-dom';
import Paged from './Paged'
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    return (
        <div>
            <nav>
                <h1>Titulo</h1>
                <Link to='/videogame'>New Videogame</Link>
                <button onClick={e => {handleClick(e)}}>Refresh</button>
            </nav>





        </div>
    )
}