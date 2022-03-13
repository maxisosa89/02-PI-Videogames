import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles/Form.module.css'
import {ArrowLeftIcon} from '@primer/octicons-react'
function validate(input) {
    let errors = {};
    if(!input.name || !input.description || !input.platforms){
        errors.error = "Complete the fields with *"
    }
    if(input.released && !/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(input.released)){
        errors.dateType = "The date must be in YYYY-MM-DD format"
    }
    if(input.rating && input.rating < 0 || input.rating > 5){
        errors.ratingRange = "The rating must be between 0.00 and 5.00"
    }
    if(input.background_image && !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(input.background_image)){
        errors.imageUrl = "The image must be a url"
    }
    return errors;
}

export default function Form(){ 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const genres = useSelector((state) => state.genres)
    const platforms = require('./platforms.json').map(el => el.name)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        released: "",
        rating: "",
        background_image: "",
        platforms: [],
        genres: [],
        description: ""
    })

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        
        if(e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        } else {
            setInput({
                ...input,
                platforms: input.platforms.filter(el => el !== e.target.value)
            })
        }
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        } else {
            setInput({
                ...input,
                genres: input.genres.filter(el => el !== e.target.value)
            })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(input.name && input.description && input.platforms && !errors.dateType && !errors.ratingRange && !errors.imageUrl){
            dispatch(postVideogame(input));
            alert("Videogame created.");
            setInput({
                name: "",
                released: "",
                rating: "",
                background_image: "",
                platforms: [],
                genres: [],
                description: ""
            })
            navigate('/home')
        } else {
            alert("Complete the fields with *")
        }
        if(errors.dateType) alert(errors.dateType)
        if(errors.ratingRange) alert(errors.ratingRange)
        if(errors.imageUrl) alert(errors.imageUrl)
    }

    return (
        <div className={styles.containerGlobalForm} style={{backgroundColor: "#4f5b62"}}>
            <nav className="navbar fixed-top navbar-dark justify-content-center" style={{backgroundColor: "#000a12"}}>

                <Link to='/home'><button className="btn btn-dark"><ArrowLeftIcon size={24} /></button></Link>
            </nav>
            <div className="container" style={{paddingTop: "70px", paddingBottom: "15px"}}>
                <div className="row justify-content-center rounded" style={{backgroundColor: "#263238"}}>
                    <div className="col-12 text-center" style={{paddingTop: "15px", paddingBottom: "15px"}}>
                        <h1>Create new videogame</h1>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                    
                        <div className="row justify-content-center ">
                            <div className="col-md-6 col-sm-12  text-center">
                                <div >
                                    <h4>Name *: </h4>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="name"
                                        onChange={e => handleChange(e)}
                                        className="form-control-md"/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12  text-center">
                                <div>
                                    <h4>Released: </h4>
                                        {
                                            errors.dateType && (
                                                <p>{errors.dateType}</p> )
                                        }
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="released"
                                        onChange={e => handleChange(e)}
                                        className="form-control-md"/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12  text-center">
                                <div>
                                    <h4>Image URL: </h4>
                                    {
                                        errors.imageUrl && (
                                            <p>{errors.imageUrl}</p> )
                                    }
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="background_image"
                                        onChange={e => handleChange(e)}
                                        className="form-control-md"/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12  text-center">
                                <div>
                                    <h4>Rating: </h4>
                                </div>
                                <div>
                                    {
                                        errors.ratingRange && (
                                            <p>{errors.ratingRange}</p> )
                                    }
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        min= "0"
                                        max= "5"
                                        step="0.01"
                                        name="rating"
                                        onChange={e => handleChange(e)}
                                        className="form-control-md"/>
                                </div>
                            </div>
                            
                            <div className="col-12  text-center" style={{paddingBottom: "25px"}}>
                                <h4>Description *: </h4>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="description"
                                    onChange={e => handleChange(e)}
                                    className="form-control-lg"
                                    style={{width: "100%", height:"100px"}}/>
                                {
                                    errors.error && (
                                        <p>{errors.error}</p>
                                    )
                                }
                            </div>
                            <div className="row">
                                <div className="dropdown col-md-6 col-sm-12" style={{marginBottom: "10px"}} >
                                    <button style={{width:"100%"}} className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                        Platforms *
                                    </button>
                                    <div className="dropdown-menu overflow-auto " aria-labelledby="dropdownMenuButton" style={{height:"350px", backgroundColor: "#4f5b62"}}>
                                        <form className="px-4 py-3">
                                            <div className="">
                                                <ul >
                                                    {   
                                                        platforms.map(el => { return(
                                                            <li key={el.id} className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    value={el}
                                                                    id={el}
                                                                    onChange={e => {handleSelect(e)}}
                                                                    className="form-check-input"
                                                                />
                                                                <label className="form-check-label" htmlFor={el}>{el}</label>
                                                            </li>
                                                        )})
                                                        
                                                    }
                                                </ul>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            
                                <div className="dropdown col-md-6 col-sm-12" style={{marginBottom: "10px"}} >
                                    <button style={{width:"100%"}} className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                        Genres
                                    </button>
                                    <div className="dropdown-menu overflow-auto " aria-labelledby="dropdownMenuButton" style={{height:"350px", backgroundColor: "#4f5b62"}}>
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
                            <div className="col-12 text-center">
                                <button type='submit' className="btn btn-dark" style={{marginBottom: "25px", marginTop: "25px"}}>Create</button>
                            </div>
                            </div>
                        </div>
                        
                    
                        
                    </form>
                </div>
            </div>
        </div>
    )
}