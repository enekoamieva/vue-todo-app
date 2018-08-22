import Vue from 'vue';
import Vuex from 'vuex';

import Dates from './modules/dates';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        user: []
    },

    mutations: {
        setUser: (state, user) => {
            
            if(user){
                state.user = user;
            }else{
                state.user = null;
            }
           
        }
    },


    getters: {
        userInfo: (state) => {
            return state.user;
        }
    },

    modules: {
        Dates
    }

});