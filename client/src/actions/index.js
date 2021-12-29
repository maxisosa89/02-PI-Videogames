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

export function getNameVideogame(payload) {
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/videogames?name=' + payload)
            return dispatch({
                type: 'GET_NAME_VIDEOGAME',
                payload: json.data
            })
        } catch (err){
            console.log(err)
        }
    }

}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}