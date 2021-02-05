import { GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "./actionType"
import { UPDATE_POSTS_FAILURE, UPDATE_POSTS_REQUEST, UPDATE_POSTS_SUCCESS } from "./actionType"
import axios from "axios"

const getPostsRequest = (payload) =>{
    return{
        type: GET_POSTS_REQUEST,
        payload
    }
}

const getPostsSuccess = (payload) =>{
    return{
        type: GET_POSTS_SUCCESS,
        payload
    }
}

const getPostsFailure = (payload) =>{
    return{
        type: GET_POSTS_FAILURE,
        payload
    }
}

const getPosts = (payload) => (dispatch) =>{
    dispatch(getPostsRequest);
    return axios
    .get("http://localhost:3000/community")
    .then(res => dispatch(getPostsSuccess(res.data)))
    .catch(err => {
        dispatch(getPostsFailure(err))
    })
}



const updatePostsRequest = (payload) =>{
    return{
        type: UPDATE_POSTS_REQUEST,
        payload
    }
}

const updatePostsSuccess = (payload) =>{
    return{
        type: UPDATE_POSTS_SUCCESS,
        payload
    }
}

const updatePostsFailure = (payload) =>{
    return{
        type: UPDATE_POSTS_FAILURE,
        payload
    }
}

const updatePosts = (id, commentObj) => (dispatch) =>{
    let tempData =[];
    dispatch(updatePostsRequest);
    axios.get(`http://localhost:3000/community/${id}`)
    // .then(res => tempData = res.data.comments)
    .then(res => tempData = res.data.comments)
    .then(tempData.push(commentObj))
    .then(console.log(tempData))
    dispatch(updatePostsRequest())
    axios.patch(`http://localhost:3000/community/${id}`,{
        comments : tempData
    })
    .then(dispatch(getPosts()))
    .catch(err => console.log(err))
    // .then(res => dispatch(updatePostsSuccess(res.data)))
    // .then(res => dispatch(updatePostsSuccess(res.data)))
    // .catch(err => {
    //     dispatch(updatePostsFailure(err))
    // })
}

export {updatePosts, getPosts}