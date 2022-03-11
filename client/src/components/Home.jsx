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

    const paged = (pageNumber, allPages) => {
        setCurrentPage(pageNumber);
        allPages.map(e => {
            e != pageNumber && document.getElementById(e).classList.remove("active");
        })
        document.getElementById(pageNumber).classList.add("active");

    }

    const pagedPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            document.getElementById(currentPage).classList.remove("active");
            document.getElementById(currentPage - 1).classList.add("active");
        }
    }

    const pagedNext = (e) => {
        if (currentPage < e){
            setCurrentPage(currentPage + 1);
            document.getElementById(currentPage).classList.remove("active");
            document.getElementById(currentPage + 1).classList.add("active");
        }
    }

    const genres = useSelector((state) => state.genres);


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
                <nav className="navbar navbar-expand-xxl fixed-top navbar-dark bg-primary justify-content-center">
                    <div className="">
                        <button className="navbar-toggler text-center" type="button" data-bs-toggle="collapse" data-bs-target="#select" aria-controls="select" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
                
                <div className="container" >
                    {/* /////// */}
                    <div className="col collapse navbar-collapse" id="select" style={{marginTop: "80px"}}>
                        <div className="navbar-nav" style={{backgroundColor: "yellow"}}>
                            <div className="navbar-nav rounded border justify-content-center">
                                <div className="row text-center">
                                    <div className="nav-item col-3">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Genres
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <form className="px-4 py-3">
                                                    <div >
                                                        <ul >
                                                            {   
                                                                genres.map(el => { return(
                                                                    <li key={el.id} className="form-check">
                                                                        <input
                                                                            type="checkbox"
                                                                            value={el.name}
                                                                            id={el.name}
                                                                            onChange={e => {handleCheck(e)}}
                                                                            className="form-check-input"
                                                                        />
                                                                        <label className="form-check-label" htmlFor={el.name}>{el.name}</label>
                                                                    </li>
                                                                )})
                                                                
                                                            }
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                                            
                                    </div>
                                    <div className="nav-item col-3">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="orderFilter" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Order by A-Z
                                            </button>
                                            <div onClick={e => {handleOrderByName(e)}} id="selectA-Z" className="dropdown-menu" aria-labelledby="orderFilter">
                                                <option value="a-z" className="dropdown-item">A-Z</option>
                                                <option value="z-a" className="dropdown-item">Z-A</option>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="nav-item col-3">
                                        <div className="dropdown">
                                            <button  className="btn btn-secondary dropdown-toggle" type="button" id="ratingFilter" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Order by Rating
                                            </button>
                                            <div onClick={e => {handleOrderByRating(e)}} id="selectRating" className="dropdown-menu" aria-labelledby="ratingFilter">
                                                <option value="-rating" className="dropdown-item">- Rating</option>
                                                <option value="+rating" className="dropdown-item">+ Rating</option>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-item col-3">
                                        <div className="dropdown">
                                            <button  className="btn btn-secondary dropdown-toggle" type="button" id="createFilter" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Filter DB-API
                                            </button>
                                            <div onClick={e => {handleFilterCreate(e)}} id="selectDBApi" className="dropdown-menu" aria-labelledby="createFilter">
                                                <option value="titleSelect" className="dropdown-item">All</option>
                                                <option value="Create" className="dropdown-item">Create</option>
                                                <option value="Existent" className="dropdown-item">Existent</option>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-item">
                                    <div className="dropdown">
                                        <button onClick={e => {handleClick(e)}} className={styles.btnHome}>Refresh</button>
                                    </div>
                                </div>
                                <div className="nav-item">
                                    <div className="dropdown">
                                        <div className="" style={{width: "100%"}}>
                                            <input type="text" placeholder="Search videogame..." onChange={(e) => handleInputChange(e)} id="searchBar"/>
                                        </div>
                                        <div className="">
                                            <button type='submit' onClick={(e) => handleSubmit(e)} className={styles.btnHome}>Search</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-item">
                                    <div className="dropdown">
                                        <Link to='/videogame' className={styles.containerCreateHome}><button className={styles.createHome}>New Videogame</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={styles.pagedHome}>
                    {
                        currentVideogames !== "Videogame not f" ?
                        <Paged 
                            videogamesPerPage={videogamesPerPage}
                            allVideogames={allVideogames.length}
                            paged={paged}
                            pagedPrev={pagedPrev}
                            pagedNext={pagedNext}
                            currentPage={currentPage}
                        />:
                        <p></p>
                    }
                </div>
                
            </div>

            <div className="row">
                

                <div className="col">
                    <div className="row equal">

                        {
                            currentVideogames === "Videogame not f" || (currentVideogames.length === 0 && (genre.length > 0 || filterApiDb !== "titleSelect")) ?
                            <p>No videogames found</p> :
                            currentVideogames.length > 0 ?
                            currentVideogames.map( el => {
                                return (
                                    <div className="col-sm-12 col-md-6 col-lg-4 text-center border" key={el.id}  style={{backgroundColor:"blue"}}>
                                        <Link to = {"/videogame/" + el.id} className={styles.linkCardHome}>
                                            <Card
                                                name={el.name}
                                                rating={el.rating}
                                                background_image={el.background_image}
                                                genres={el.genres}/>
                                        </Link>
                                    </div>
                                )
                            }) :
                            <p>Loading...</p>
                        }

                    </div>
                </div>
            </div>    

        </div>

    )
}

