<template>
    <div v-if="userInfo">
        
        <header class="vue-TodoHeader">
            <span class="usernamePhoto"><img :src="userInfo.photoURL"/></span>
            <p class="vueTodoHeaderDate">
                <span>{{ viewTodayDateHeader }}</span>
            </p>

            <p class="vueTodoHeaderTasks">
                <span v-if="countNotesProp > 1">
                    Hola {{ userInfo.displayName }}, tienes {{ countNotesProp }} tareas pendientes
                </span>
                <span v-else-if="countNotesProp == 1">Hola {{ userInfo.displayName }}, tienes 1 tarea pendiente</span>
                <span v-else>
                    <small>No tienes notas {{ userInfo.displayName }}. 
                        <a href="#" @click="addNoteFocus()">Añade una nueva</a>
                    </small>
                </span>
            </p>

            <form @submit.prevent>
                <button class="btn-floating cyan waves-effect waves-light" @click="sendNote()">
                    <i class="material-icons">add</i>
                </button>
                <div class="vue-TodoAddTaskInput input-field col s6">
                    <input 
                        type="text" 
                        id="input-task" 
                        class="validate" 
                        placeholder="Añadir una tarea" 
                        v-model="note"
                        ref="noteInputFocus"
                    >
                </div>
            </form>
            
        </header>

    </div>
</template>


<script>
    import firebaseApp from '../firebaseConfig';
    import { mapGetters } from 'vuex';
    
    export default{

        props: ['countNotesProp'],

        data(){
            return{
                username: '',
                note: null,
                date: null,
                close: false,
                notes: []
            }
        },

        methods: {
            sendNote(){
                if( this.note === null ){
                    alert('Debes de introducir una nota válida');
                }else{

                    //Remove @gmail.com to the mail
                    this.username = this.userInfo.email.split('@').shift();
                    //Call Mutation module DATES 
                    this.$store.commit('setToday');

                    firebaseApp.database().ref('/notes').push({
                        username: this.username,
                        note: this.note,
                        date: this.viewTodayDate,
                        close: this.close
                    }).then( (data) => {
                        //Save Key note in variable
                        const key = data.key;
                        //Save Key note in Firebase database
                        firebaseApp.database().ref('/perfiles').child(this.username).child('notes').child(key).set(true);
                        //Reset note
                        this.note = '';
                    });
                }
            },

             addNoteFocus(){
                this.$refs.noteInputFocus.focus();
            },

        },

        computed: {
            ...mapGetters( ['userInfo', 'viewTodayDate', 'viewTodayDateHeader'] )
        },
    }

</script>


<style>

    /*** HEADER  ***/
    .vue-TodoHeader{
        position: relative;
        background: url('https://source.unsplash.com/collection/158643/') center center no-repeat;
        border-radius: 3px 3px 0 0;
        padding: 1em;
        min-height: 200px;
    }

    .vueTodoHeaderDate{
        font-size: 32px;
        color: #fff;
    }

    .vueTodoHeaderDate span, .vueTodoHeaderTasks span {
        background: rgba(0, 0, 0, .50);
        border-radius: 3px;
        padding: 5px;
    }

    .vueTodoHeaderTasks{
        font-size: 16px;
        color: #fff;
    }

    .usernamePhoto img{
        border-radius: 50%;
        width: 50px;
        position: absolute;
        float: right;
        right: 20px;
        border: 3px solid #e5e5e5;
    }

    /*** FORM ADD TASKS ***/
    .vue-TodoHeader .btn-floating{
        position: absolute;
        bottom: -20px;
        right: 20px;
    }

    .vue-TodoAddTaskInput{
        background: #fff;
        position: absolute;
        bottom: -40px;
        width: 80%;
    }

    .vue-TodoAddTaskInput #input-task{
        padding: 0 10px;
    }

    input.validate{
        border: none !important;
    }
    #input-task{
        max-width: 95.5% !important;
    }

</style>