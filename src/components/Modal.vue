<template>
    <div>

        <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
            <h4>Cerra sesión</h4>
            <p>¿Estás seguro que deseas cerrar tu sesión?</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="logout()">Si</a>
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">No</a>
            </div>
        </div>

    </div>
</template>


<script>
    import firebaseApp from '../firebaseConfig';

    export default{

        mounted() {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems);
        },

        props: [ 'closeSesion' ],

        methods: {

            logout(){

                if(this.closeSesion){
                    firebaseApp.auth().signOut()
                        .then( () => {
                            console.log( 'Te has desconectado correctamente');
                            this.$store.commit('logOffUser');
                            this.$router.push('/');
                        })
                        .catch( () => console.log( 'Ha ocurrido un error' ) );
                }
            
            }
        }


    }
</script>