import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames } from "../actions/index";
import { Link } from 'react-router-dom';
import Paged from './Paged'
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
   
   
    const genres = useSelector((state) => state.genres)


    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    return (
        <div>
            <nav>
                <h1>Titulo</h1>
                <button onClick={e => {handleClick(e)}}>Refresh</button>
                <div>
                    <input type="text" placeholder="Search videogame..."/>
                    <button type='submit'>Search</button>
                </div>
                <Link to='/videogame'>New Videogame</Link>
            </nav>
            <div>
                <select>
                    <option value="orderby">Order by</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
                <select>
                    <option value="orderby">Order by</option>
                    <option value="-rating">- Rating</option>
                    <option value="+rating">+ Rating</option>
                </select>
                <select>
                    <option value="Genres">Genres</option>
                    {
                        genres.map(el => (
                            <option value={el.name}>{el.name}</option>
                        ))
                    }
                </select>
                <select>    
                    <option value="DB-Api" >DB-Api</option>
                    <option value="Create" >Create</option>
                    <option value="Existent" >Existent</option>
                </select>
            </div>
            <div>
                {
                    
                    allVideogames?.map( el => {
                        
                        return (
                            <Link to = {"/videogame/" + el.id}>
                                <Card name={el.name} rating={el.rating} background_image={el.background_image} genres={el.genres.map(e => e.name + ". ")}/>
                            </Link>
                        )
                        
                    })
                }
            </div>






        </div>
    )
}