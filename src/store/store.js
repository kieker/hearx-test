import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        name : "",
        email :"",
        results : 0,
    },
    mutations: {
        saveEmail(state, payload){
            state.email = payload
        },
        saveName(state,payload){
            state.name = payload
        },
        saveResults(state,payload){
            state.results = payload
        }
    },
    actions: {
        saveEmail(context,payload){
            context.commit('saveEmail', payload)
        },
        saveName(context,payload){
            context.commit('saveName', payload)
        },
        saveResults(context,payload){
            context.commit('saveResults', payload)
        },
    }
});