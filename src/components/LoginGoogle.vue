<template>

    <div class="vue-Todo">
        <button class="btn waves-effect waves-light" @click="loginWithGoogle()">Google
            <i class="material-icons right">send</i>
        </button>
    </div>

</template>


<script>
    import firebase from 'firebase';
    
    export default{

        data(){
            return{
                usuario:[]
            }
        },

        methods: {

            loginWithGoogle(){
                const provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider)
                    .then(function(result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        //var token = result.credential.accessToken;
                        // The signed-in user info.
                        //var user = result.user;
                        this.$router.push({name: 'notes'});                       
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                    });
                this.$router.push({name: 'notes'});

            }

        }
    }

</script>


<style scoped>

    .vue-Todo{
        margin: 0 auto;
        padding: 2em;
    }

</style>