const initialState = {
    videogames: [],
    all: [],
    genres: []
}

function rootReducer (state= initialState, action) {
    switch(action.type) {
        case "GET_VIDEOGAMES":
            return{
                ...state,
                videogames: action.payload,
                all: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case 'ORDER_BY_NAME':
            const orderByName = 
            action.payload === 'order' ?
            state.videogames :
            action.payload === 'a-z' ? 
            state.videogames.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                return 0;
                }) :
            state.videogames.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                return 0;
                })
            return{
                ...state,
                payload: orderByName
            }
        case 'ORDER_BY_RATING':
            const orderByRating = 
            action.payload === 'order' ?
            state.videogames :
            action.payload === '-rating' ? 
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating) return 1;
                if(b.rating > a.rating) return -1;
                return 0;
                }) :
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating) return -1;
                if(b.rating > a.rating) return 1;
                return 0;
                })
            return{
                ...state,
                payload: orderByRating
            }
        case 'GET_NAME_VIDEOGAME':
            return {
                ...state,
                videogames: action.payload
            }
        case 'FILTER_BY_CREATE':
            const allV = state.all
            const createFiltered = 
                action.payload === "titleSelect" ?
                allV :
                action.payload === "Create" ?
                allV.filter(el => el.db === true) :
                allV.filter(el=> el.db !== true)
            return {
                ...state,
                videogames: createFiltered
            }
        case 'FILTER_BY_GENRE':
            const allV2 = state.all
            console.log(action.payload)
            const genreFiltered = 
                action.payload === "titleSelect" ?
                allV2 :
                allV2.filter(el => {
                    for (let i = 0; i < el.genres.length; i++){
                        if (el.genres[i].name === action.payload) return el
                    }
                })
            return {
                ...state,
                videogames: genreFiltered
            }
        default: return state
    }
}

export default rootReducer;