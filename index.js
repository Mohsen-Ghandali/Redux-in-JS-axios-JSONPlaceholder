//------npm i redux--------------
//------npm i redux-thunk --------
//------npm i axios--------------

// Import Modules
const REDUX = require("redux");
const REDUX_THUNK = require("redux-thunk").default;
const AXIOS = require("axios");

// Action Types
const SET_POSTS = "SET_POSTS";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

// Action Creators
const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

const setLoading = (status) => {
    return {
        type: SET_LOADING,
        payload: status
    }
}

const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

// Initial State
const initialState = {
    loading: true,
    posts: null,
    error: ""
}

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return { ...state, posts: action.payload }
        }
        case SET_LOADING: {
            return { ...state, loading: action.payload }
        }
        case SET_ERROR: {
            return { ...state, error: action.payload }
        }
        default: {
            return state;
        }
    }
}

// Thunk Action
const fetchPosts = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            let res = await AXIOS.get("https://jsonplaceholder.typicode.com/posts");
            dispatch(setPosts(res.data.slice(0, 5)));
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    }
}

// Create Redux Store
const store = REDUX.createStore(reducer, REDUX.applyMiddleware(REDUX_THUNK));

// Subscribe to Store
store.subscribe(() => console.log(store.getState()));

// Dispatch the Thunk Action
store.dispatch(fetchPosts());
