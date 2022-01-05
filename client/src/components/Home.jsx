import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames, orderByName, orderByRating, getNameVideogame, filterByCreate, filterByGenre } from "../actions/index";
import { Link } from 'react-router-dom';
import Paged from './Paged'
import Card from './Card'
import styles from './styles/Home.module.css'


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
    const [genre,setGenre] = useState([])
    const [filterApiDb,setFilterApiDb] = useState('titleSelect')

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
        setFilterApiDb('titleSelect')
        setGenre([])
        resetFilter();
    }

    function resetFilter() {
        document.getElementById("selectA-Z").value = "titleSelect"
        document.getElementById("selectRating").value = "titleSelect"
        document.getElementById("selectDBApi").value = "titleSelect"
        genres.map((e) => {
            document.getElementById(e.name).checked = false
        })
        document.getElementById("searchBar").value = ""
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

    function handleFilterGenre(e){
        dispatch(filterByGenre(e))
    }

    function handleFilterCreate(e){
        dispatch(filterByCreate(e.target.value))
        setFilterApiDb(e.target.value)
    }
    useEffect(() => {
        handleFilterGenre(genre)
    }, [genre]);

    function handleCheck(e){
        if(e.target.checked){
            setGenre([...genre, e.target.value])
        } else {
            setGenre(genre.filter(el => el !== e.target.value))
        }
    }
    return (
        <div className={styles.containerGlobalHome}>
            <div className={styles.fixedNavHome}>
                <nav className={styles.navHome}>
                    <Link to='/' className={styles.containerTitleHome}><h1 className={styles.titleHome}>Videogames</h1></Link>
                    
                    <button onClick={e => {handleClick(e)}} className={styles.btnHome}>Refresh</button>
                    <div className={styles.containerSearchBarHome}>
                        <input type="text" placeholder="Search videogame..." onChange={(e) => handleInputChange(e)} id="searchBar"/>
                        <button type='submit' onClick={(e) => handleSubmit(e)} className={styles.btnHome}>Search</button>
                    </div>
                    <Link to='/videogame' className={styles.containerCreateHome}><h3 className={styles.createHome}>New Videogame</h3></Link>
                </nav>
                <div id="select" className={styles.containerFiltersHome}>
                    <select onChange={e => {handleOrderByName(e)}} id="selectA-Z" className={styles.selectHome}>
                        <option value="titleSelect">Order by</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                    <select onChange={e => {handleOrderByRating(e)}} id="selectRating" className={styles.selectHome}>
                        <option value="titleSelect">Order by</option>
                        <option value="-rating">- Rating</option>
                        <option value="+rating">+ Rating</option>
                    </select>
                    <select onChange={e => {handleFilterCreate(e)}} id="selectDBApi" className={styles.selectHome} defaultValue="titleSelect" >    
                        <option value="titleSelect" >DB-Api</option>
                        <option value="Create" >Create</option>
                        <option value="Existent" >Existent</option>
                    </select>
                </div>
                <div className={styles.pagedHome}>
                    {
                        currentVideogames !== "Videogame not f" ?
                        <Paged 
                            videogamesPerPage={videogamesPerPage}
                            allVideogames={allVideogames.length}
                            paged={paged}
                        />:
                        <p></p>
                    }
                </div>
                
            </div>
            <div className={styles.containerGenresCard}>
                <div className={styles.containerGenres}>
                    <h4 className={styles.titleGenres}>Genres</h4>
                    <form>
                    <ul className={styles.listGenres}>
                        {   
                            
                            genres.map(el => { return(
                                <li key={el.id}>
                                    <input
                                        type="checkbox"
                                        value={el.name}
                                        id={el.name}
                                        onChange={e => {handleCheck(e)}}
                                    />
                                    {el.name}
                                </li>
                            )})
                            
                        }
                    </ul>
                    </form>
                </div>
            
                <div className={styles.containerCardsHome}>
                    {
                        currentVideogames === "Videogame not f" || (currentVideogames.length === 0 && (genre.length > 0 || filterApiDb !== "titleSelect")) ?
                        <p>No videogames found</p> :
                        currentVideogames.length > 0 ?
                        currentVideogames.map( el => {
                            return (
                                <div className={styles.cardHome} key={el.id}>
                                    <Link to = {"/videogame/" + el.id} className={styles.linkCardHome}>
                                        <Card
                                            name={el.name}
                                            rating={el.rating}
                                            background_image={el.background_image}
                                            genres={el.genres.map(e => e.name + ". ")}/>
                                    </Link>
                                </div>
                            )
                        }) :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}