<template>
    <div>

        <nav class="nav-extended">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">Vue Todo App</a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger" @click="openMobileNav()">
                    <i class="material-icons">menu</i>
                </a>

                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <router-link v-if="!userInfo" to="/" tag="li"><a>Inicio</a></router-link>
                    <router-link v-if="userInfo" to="/user" tag="li"><a>Usuario</a></router-link>
                    <router-link to="/notes" tag="li"><a>Notas</a></router-link>
                    <li v-if="userInfo"><a href="#modal1" class="modal-trigger">Desconectar</a></li>
                </ul>
            </div>
        </nav>
                
        <ul class="sidenav" id="mobile-demo">
            <router-link v-if="!userInfo" to="/" tag="li"><a>Inicio</a></router-link>
            <router-link v-if="userInfo" to="/user" tag="li"><a>Usuario</a></router-link>
            <router-link to="/notes" tag="li"><a>Notas</a></router-link>
            <li v-if="userInfo"><a href="#modal1" class="modal-trigger">Desconectar</a></li>
        </ul>

        <!-- Modal component -->
        <modal :closeSesion="true"/>

        <!-- Routes -->
        <router-view></router-view>

    </div>

</template>


<script>

    import firebaseApp from '../firebaseConfig';
    import Modal from './Modal'
    import {mapGetters} from 'vuex';

    export default{

        components: {
            Modal
        },

        methods:{

            openMobileNav(){
                var elems = document.querySelectorAll('.sidenav');             
                M.Sidenav.init(elems);
            }

        },

        computed: {
            ...mapGetters( ['userInfo'] )
        }
    }

</script>


<style scope>
    .nav-extended{
        margin-bottom: 50px;
    }

    @media only screen and (min-width: 992px){
        .nav-wrapper .brand-logo{
            margin-left: 30px !important;
        }
    }
</style>