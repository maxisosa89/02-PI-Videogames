import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames, orderByName, orderByRating, getNameVideogame } from "../actions/index";
import { Link } from 'react-router-dom';
import Paged from './Paged'
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);

    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    const [name, setName] = useState("")
    const [orderByN,setOrderByN] = useState('')
    const [orderByR,setOrderByR] = useState('')


    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
   
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
        setOrderByN('titleSelect')
        setOrderByR('titleSelect')
        resetFilter();
    }

    function resetFilter() {
        document.getElementById("selectA-Z").value = "titleSelect"
        document.getElementById("selectRating").value = "titleSelect"
        document.getElementById("selectGenres").value = "titleSelect"
        document.getElementById("selectDBApi").value = "titleSelect"
    }

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameVideogame(name))
        setName("")
    }

    function handleOrderByName (e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrderByN(e.target.value)
    }

    function handleOrderByRating (e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrderByR(e.target.value)
    }

    return (
        <div>
            <nav>
                <h1>Titulo</h1>
                <button onClick={e => {handleClick(e)}}>Refresh</button>
                <div>
                    <input type="text" placeholder="Search videogame..." onChange={(e) => handleInputChange(e)}/>
                    <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
                </div>
                <Link to='/videogame'>New Videogame</Link>
            </nav>
            <div id="select">
                <select onChange={e => {handleOrderByName(e)}} id="selectA-Z">
                    <option value="titleSelect">Order by</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
                <select onChange={e => {handleOrderByRating(e)}} id="selectRating">
                    <option value="titleSelect">Order by</option>
                    <option value="-rating">- Rating</option>
                    <option value="+rating">+ Rating</option>
                </select>
                <select id="selectGenres">
                    <option value="titleSelect">Genres</option>
                    {
                        genres.map(el => (
                            <option value={el.name}>{el.name}</option>
                        ))
                    }
                </select>
                <select id="selectDBApi">    
                    <option value="titleSelect" >DB-Api</option>
                    <option value="Create" >Create</option>
                    <option value="Existent" >Existent</option>
                </select>
            </div>
            <div>
                <Paged 
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paged={paged}
                />
            </div>
            <div>
                {
                    
                    currentVideogames?.map( el => {
                        
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