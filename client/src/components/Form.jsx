import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postCharacter, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function Form(){ 
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)
    const platforms = require('./platforms.json').map(el => el.name)
    
    const [input, setInput] = useState({
        name: "",
        released: "",
        rating: "",
        background_image: "",
        platforms: [],
        genres: []
    })

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        /* setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        })) */
    }

    function handleSelect(e){
        if(!input.platforms.includes(e.target.value)){
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

    return (
        <div>
            <h1>Create new videogame</h1>
            <form>
                <h4>Name: </h4>
                <input
                    type="text"
                    autoComplete="off"
                    name="name"
                    onChange={e => handleChange(e)}/>
                    {console.log(input)}
                <h4>Released: </h4>
                <input
                    type="text"
                    autoComplete="off"
                    name="released"
                    onChange={e => handleChange(e)}/>
                <h4>Rating: </h4>
                <input
                    type="number"
                    min= "0"
                    max= "5"
                    step="0.01"
                    name="rating"
                    onChange={e => handleChange(e)}/>
                <h4>Image: </h4>
                <input
                    type="file"
                    name="background_image"
                    onChange={e => handleChange(e)}/>
                <h4>Platforms: </h4>
                <select onChange={e => handleSelect(e)}>
                <option value="platforms">Platforms</option>
                {
                    
                    platforms.map(el => (
                        <option
                            value={el}>
                            {el}
                        </option>
                    ))
                    
                }
                </select >
                <h4>Genres: </h4>
                {
                    genres.map(el => (
                        <label>
                            <input
                                type="checkbox"
                                value={el.name}
                                id={el.name}
                                onChange={e => handleCheck(e)}
                            />
                            {el.name}
                        </label>
                    ))
                }
            </form>
        </div>
    )
}