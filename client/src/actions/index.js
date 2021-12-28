import axios from "axios";

export function getVideogames() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames",{})
        return dispatch ({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}

export function getGenres() {
    return async function (dispatch){
        try{
            const info = await axios.get('http://localhost:3001/genres', {})
            return dispatch({
                type: "GET_GENRES",
                payload: info.data
            })
        }catch(err){
            console.log("Error")
        }
    }
}