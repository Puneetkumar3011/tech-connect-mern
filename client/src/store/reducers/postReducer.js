import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING
} from '../actions/types';

const initialState = {
  posts: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      {
        let newState1 = state.posts.filter(post => post._id === action.payload._id);
        let newState = {...state};
        newState.posts.map((post) => {
          if (post._id === action.payload._id) {
            post.comments = action.payload.comments;
          }
        });
        return newState;
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
