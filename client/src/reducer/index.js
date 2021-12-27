const initialState = {
    videogames: [],
    all: []
}

function rootReducer (state= initialState, action) {
    switch(action.type) {
        case "GET_VIDEOGAMES":
            return{
                ...state,
                videogames: action.payload,
                all: action.payload
            }
        default: return state
    }
}

export default rootReducer;