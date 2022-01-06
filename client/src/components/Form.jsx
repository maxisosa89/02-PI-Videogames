import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles/Form.module.css'

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
        if(!input.platforms.includes(e.target.value) && e.target.value !== "platforms"){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
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
        <div className={styles.containerGlobalForm}>
            <nav className={styles.navForm}>
                <Link to = '/' className={styles.containerTitleForm}>
                    <h3 className={styles.titleForm}>Videogames</h3>
                </Link>
                <Link to = '/home'>
                    <button className={styles.btnForm}>Go home</button>
                </Link>
            </nav>
            <div className={styles.containerInfoForm}>
                <h1>Create new videogame</h1>
                <form onSubmit={e => handleSubmit(e)}>
                <div className={styles.contaierThreeDivs}>
                    <div className={styles.containerDivOne}>
                        <h4>Name *: </h4>
                        <input
                            type="text"
                            autoComplete="off"
                            name="name"
                            onChange={e => handleChange(e)}/>
                        <h4>Released: </h4>
                        {
                            errors.dateType && (
                                <p>{errors.dateType}</p> )
                        }
                        <input
                            type="text"
                            autoComplete="off"
                            name="released"
                            onChange={e => handleChange(e)}/>
                        <h4>Rating: </h4>
                        {
                            errors.ratingRange && (
                                <p>{errors.ratingRange}</p> )
                        }
                        <input
                            type="number"
                            min= "0"
                            max= "5"
                            step="0.01"
                            name="rating"
                            onChange={e => handleChange(e)}/>
                        <h4>Image URL: </h4>
                        {
                            errors.imageUrl && (
                                <p>{errors.imageUrl}</p> )
                        }
                        <input
                            type="text"
                            name="background_image"
                            onChange={e => handleChange(e)}/>
                        <h4>Platforms *: </h4>
                        <select onChange={e => handleSelect(e)}>
                        <option value="platforms">Platforms</option>
                        {
                            platforms.map(el => (
                                <option value={el} key={el}>
                                    {el}
                                </option>
                            ))
                        }
                        </select >
                        <h4>Description *: </h4>
                        <input
                            type="text"
                            autoComplete="off"
                            name="description"
                            onChange={e => handleChange(e)}/>
                        {
                            errors.error && (
                                <p>{errors.error}</p>
                            )
                        }
                        </div>
                        <div className={styles.containerDivTwo}>
                        <h4>Platforms selected:</h4>
                        <ul className={styles.ulForm}>
                            {
                                input.platforms.map(el => (
                                    <li key={el}>{el}<button type="button" onClick={() => handleDelete(el)} className={styles.btnXForm}>X</button></li>
                                ))
                            }         
                        </ul>
                        </div>
                        <div className={styles.containerDivThree}>
                            <h4>Genres: </h4>
                            <ul>
                                {
                                    genres.map(el => (
                                        <li key={el.name}>
                                            <input
                                                type="checkbox"
                                                value={el.name}
                                                id={el.name}
                                                onChange={e => handleCheck(e)}
                                            />
                                            {el.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                </div>
                <button type='submit' className={styles.btnCreateForm}>Create</button>
                </form>
            </div>
        </div>
    )
}