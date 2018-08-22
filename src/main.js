import Vue from 'vue';
import App from './App.vue';
//MATERIALIZE CSS
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

//ROUTES
import VueRouter from 'vue-router';
import routes from './routes.js';

//FIREBASE
import firebaseApp from './firebaseConfig';

//VUEX
import store from './store/index';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

router.beforeEach( (to, from, next) => {

    firebaseApp.auth().onAuthStateChanged( user => {
        //Leemos el registro de la propiedad META de las rutas asignadas con esta propiedad
        let autorizacion = to.matched.some( record => record.meta.auth );
        
        if( autorizacion && !user ){
            next('/');
        }else if( !autorizacion && user ){
            next('notes');
        }else if( autorizacion && user ){
            next();
        }else{
            next();
        }
    });
});


new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App),

    mounted() {
        firebaseApp.auth().onAuthStateChanged( user => {

            if(user){
                store.commit('setUser', user);
            }else{
                store.commit('setUser', null);
            }

        });
    }

});