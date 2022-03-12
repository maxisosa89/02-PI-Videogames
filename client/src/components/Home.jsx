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
    const [videogamesPerPage, setVideogamesPerPage] = useState(12)
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
        
        <div className={styles.containerGlobalHome} style={{backgroundColor: "#4f5b62", width:"100%"}}>
            <div className={styles.fixedNavHome}>
                <nav className="navbar navbar-expand-xxl fixed-top navbar-dark justify-content-center" style={{backgroundColor: "#000a12"}}>
                    <div className="" >
                        <button className="navbar-toggler text-center" type="button" data-bs-toggle="collapse" data-bs-target="#select" aria-controls="select" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
                
                <div className=""  style={{paddingTop:"60px"}}>
                    {/* /////// */}
                    <div className="col collapse navbar-collapse fixed-top" id="select" style={{marginTop:"60px"}}>
                        <div className="navbar-nav border" style={{backgroundColor: "#4f5b62"}}>
                                <div className="nav-item row " style={{margin:"5px"}} >
                                    
                                    
                                    
                                    
                                    <div className="dropdown col justify-content-center" >
                                        <div className="input-group text-center" >
                                            <input type="search" className="form-control rounded" placeholder="Search videogame..." aria-label="Search" aria-describedby="search-addon" onChange={(e) => handleInputChange(e)} id="searchBar" />
                                            <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-dark">search</button>
                                        </div>
                                    </div>
                                </div>
                            <div className="navbar-nav justify-content-center">
                                <div className="row text-center" style={{margin:"5px"}} >
                                    <div className="nav-item col-lg-3 col-md-6 col-sm-12 " >
                                        <div className="dropdown"  >
                                            <button style={{width:"100%"}} className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                                Genres
                                            </button>
                                            <div className="dropdown-menu overflow-auto border" aria-labelledby="dropdownMenuButton" style={{height:"350px", backgroundColor: "#4f5b62"}}>
                                                <form className="px-4 py-3">
                                                    <div className="">
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
                                    <div className="nav-item col-lg-3 col-md-6 col-sm-12">
                                        <div className="dropdown">
                                            <button style={{width:"100%"}} className="btn btn-dark dropdown-toggle" type="button" id="orderFilter" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Order by A-Z
                                            </button>
                                            <div onClick={e => {handleOrderByName(e)}} id="selectA-Z" className="dropdown-menu border" aria-labelledby="orderFilter" style={{backgroundColor: "#4f5b62"}}>
                                                <span value="a-z" className="dropdown-item" style={{color: "#ffffff"}}>A-Z</span>
                                                <span value="z-a" className="dropdown-item" style={{color: "#ffffff"}}>Z-A</span>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="nav-item col-lg-3 col-md-6 col-sm-12">
                                        <div className="dropdown">
                                            <button style={{width:"100%"}} className="btn btn-dark dropdown-toggle" type="button" id="ratingFilter" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Order by Rating
                                            </button>
                                            <div onClick={e => {handleOrderByRating(e)}} id="selectRating" className="dropdown-menu border" aria-labelledby="ratingFilter" style={{backgroundColor: "#4f5b62"}}>
                                                <option value="-rating" className="dropdown-item" style={{color: "#ffffff"}}>- Rating</option>
                                                <option value="+rating" className="dropdown-item" style={{color: "#ffffff"}}>+ Rating</option>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-item col-lg-3 col-md-6 col-sm-12">
                                        <div className="dropdown">
                                            <button style={{width:"100%"}} className="btn btn-dark dropdown-toggle" type="button" id="createFilter" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Filter DB-API
                                            </button>
                                            <div onClick={e => {handleFilterCreate(e)}} id="selectDBApi" className="dropdown-menu border" aria-labelledby="createFilter" style={{backgroundColor: "#4f5b62"}}>
                                                <option value="titleSelect" className="dropdown-item" style={{color: "#ffffff"}}>All</option>
                                                <option value="Create" className="dropdown-item" style={{color: "#ffffff"}}>Create</option>
                                                <option value="Existent" className="dropdown-item" style={{color: "#ffffff"}}>Existent</option>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row text-center" style={{margin:"5px"}}>
                                    <div className="nav-item col-md-6">
                                        <div className="dropdown">
                                            <button style={{width:"100%"}} onClick={e => {handleClick(e)}} className="btn btn-dark">Refresh</button>
                                        </div>
                                    </div>
                                    <div className="nav-item col-md-6  col-sm-12">
                                        <div className="dropdown">
                                            <Link to='/videogame' className={styles.containerCreateHome}><button style={{width:"100%"}} className="btn btn-dark">New Videogame</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
            </div>

            <div className="row container-fluid justify-content-center" style={{paddingTop:"10px", paddingBottom:"100px", marginLeft:"0"}}>
                

                <div className="col ">
                    <div className="row equal justify-content-center" style={{backgroundColor:"#4f5b62"}}>

                        {
                            currentVideogames === "Videogame not f" || (currentVideogames.length === 0 && (genre.length > 0 || filterApiDb !== "titleSelect")) ?
                            <p>No videogames found</p> :
                            currentVideogames.length > 0 ?
                            
                            currentVideogames.map( el => {
                                return (
                                    <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center" key={el.id}>
                                    <div className="text-center"   style={{padding:"1%", height:"95%", width:"95%"}}>
                                        <Link to = {"/videogame/" + el.id} className={styles.linkCardHome}>

                                            <Card
                                                name={el.name}
                                                rating={el.rating}
                                                background_image={el.background_image}
                                                genres={el.genres}
                                                />
                                           
                                        </Link>
                                    </div>
                                    </div>
                                )
                            }) :
                            <div className="text-center" style={{ marginTop:"200px", paddingBottom:"200px"}}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>    
            <nav className="navbar fixed-bottom justify-content-center" style={{backgroundColor: "#000a12"}}>
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
            </nav>
        </div>

    )
}

