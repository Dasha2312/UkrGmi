import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state: {
        posts: [],
        comments: [],
        searchValue: ''
    },
    mutations: {
        SET_POSTS_FROM_API(state, posts) {
            state.posts = posts;
        },
        SET_COMMENTS_FROM_API(state, comments) {
            comments.forEach(function(item) {
                let postId = parseInt(item.postId)
                if (!(postId in state.comments)){
                    state.comments[postId] = [];
                }
                state.comments[item.postId].push(item);
                
            });
            // console.log(state.comments);
        },
        SET_SEARCH_VALUE(state, value) {
            state.searchValue = value;
        }
    },
    actions: {
        async GET_POSTS_FROM_API({commit}) {
            try {
                const posts = await axios('https://jsonplaceholder.typicode.com/posts', {
                    method: 'GET'
                });
                commit('SET_POSTS_FROM_API', posts.data);
                console.log('post');
                return posts
            } catch (error) {
                console.log(console.error);
                return error;
            }
        },
        async GET_COMMENTS_FROM_API({commit}) {
            try {
                const comments = await axios('https://jsonplaceholder.typicode.com/comments', {
                    method: 'GET'
                });
                commit('SET_COMMENTS_FROM_API', comments.data);
                console.log('com');
                return comments;
            } catch (error) {
                console.log(error)
                return error
            }
        },
        GET_SEARCH_VALUE({commit}, value) {
            commit('SET_SEARCH_VALUE', value)
        }
    },
    getters: {
        POSTS(state) {
            return state.posts;
        },
        COMMENTS(state) {
            return state.comments;
        },
        SEARCH_VALUE(state) {
            return state.searchValue;
        }
    }
})