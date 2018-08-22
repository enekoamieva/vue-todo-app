<template>
    <main class="vue-Todo">
    
        <form-notes :countNotesProp="countNotes" />
        
        <section class="vue-TodoBody" >

            <div>
                <h3 v-if="countNotes >= 1">Mi lista de tareas</h3>
                <br v-else><br>
                <div class="progress" v-if="loader">
                    <div class="indeterminate"></div>
                </div>
                
                <div v-else>
                    <transition-group tag="ul" class="collection with-header"
                        enter-active-class="animated pulse"
                        leave-active-class="animated fadeOut"  
                    >                    
                        <li class="collection-item"  v-for="(note, index) in notes" :key="index">
                            <p class="collection-item__text note-read" 
                                    contenteditable="true"
                                    @blur="editNote($event, note.id)"
                            >
                                {{ note.note }}
                            </p>
                            <small><em>{{ note.date }}</em></small>
                            <a class="vue-TodoButtonComplete waves-effect waves-teal btn-flat" @click="closeNote(note.id)">Completar</a>
                        </li>
                    </transition-group>
                </div>
            </div>

            <!-- Completed Notes -->
            <div v-if="countNotesCompleted" class="scale-transition scale-in">
                <h4>Tareas completadas</h4>
                <transition-group tag="ul" class="collection with-header"
                    enter-active-class="animated pulse"       
                    leave-active-class="animated fadeOut"       
                > 
                    <li class="collection-item" v-for="(note, index) in closedNotes" :key="index">
                        <p class="collection-item__text"><strike>{{ note.note }}</strike></p>
                        <a class="vue-TodoButtonDelete waves-effect waves-teal btn-flat" @click="deleteNote(note.id)">Eliminar</a>
                    </li>                
                </transition-group>
            </div>

        </section>

    </main>
</template>


<script>
    import firebaseApp from '../firebaseConfig';
    import { database } from 'firebase';
    import { mapGetters } from 'vuex';

    import FormNotes from './FormNotes';
    
    export default{

        components:{
            FormNotes
        },

        created() {
            //Remove @gmail.com to the mail
            this.username = this.userInfo.email.split('@').shift();
            //Preloader
            this.loader = true;
            
            firebaseApp.database().ref('/notes').on( 'value', snapshot => this.readNotes(snapshot.val()) );
            firebaseApp.database().ref('/notes').on( 'value', snapshot => this.readClosedNotes(snapshot.val()) );
            
        },

        data() {
            return{
                username: '',
                note: null,
                date: null,
                id: null,
                notes:[],
                closedNotes: [],
                loader: false
            } 
        },

        methods: {

            readNotes(data){
                this.notes = [];

                for(let key in data){
        
                    if( data[key].close == false && data[key].username == this.username){
                        //Call Mutation Store Module Dates
                        this.$store.commit('setFromNow', data[key].date);

                        this.notes.push({
                            note: data[key].note,
                            username: data[key].username,
                            date: this.viewFromNowDate,
                            id: key
                         });
                    } 
                }

                //Order notes
                this.notes.reverse();
                //Close preloader
                this.loader = false;
            },

            readClosedNotes(data){
                this.closedNotes = [];

                for(let key in data){

                    if(  data[key].close == true && data[key].username == this.username){
                        this.closedNotes.push({
                            note: data[key].note,
                            username: data[key].username,
                            id: key
                        });
                    }
                    //Close preloader
                    this.loader = false;
                }
            },

            editNote(data, id){
                firebaseApp.database().ref('/notes/' + id).update({
                    note: data.target.innerText
                });
            },

            closeNote(id){
                firebaseApp.database().ref('/notes/' + id).update({
                    close: true
                });
            },

            deleteNote(id){
                firebaseApp.database().ref('/notes/' + id).remove();
                firebaseApp.database().ref('/perfiles').child(this.username).child('notes').child(id).remove();
            }

        },

        computed: {

            countNotes(){
                return this.notes.length;
            },

            countNotesCompleted(){
                return this.closedNotes.length;
            },

            ...mapGetters( ['userInfo', 'viewFromNowDate'] )

        }
    }

</script>


<style scoped>

    .vue-Todo{
        background: white;
        border-radius: 3px;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom: 40px;
        width: 60%;
        min-width: 400px;
        max-width: 600px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, .20);
    }

    @media only screen and (max-width: 450px){
        .vue-Todo{
            min-width: 95%;
        }
    }


    /*** BODY ***/
    .vue-TodoBody h4, .vue-TodoBody h3{
        padding-left: 20px;
        margin-top: 50px
    }


    /*** TASK LIST ***/
    .vue-TodoButtonComplete{
        float: right;
        /* position: absolute; */
        bottom: 30px;
        color: white !important;
    }

    .vue-TodoButtonDelete{
        float: right;
        /* position: absolute; */
        bottom: 42px;
        color: Crimson !important;
    }

    .vue-TodoButtonDelete:hover{
        color: Crimson !important;
    }

    .vue-TodoButtonComplete:hover{
        color: lightgrey !important;
    }


    .collection{
        /* overflow: initial !important; */
        margin-bottom: 0 !important;
    }

    .collection-item small{
        color: lightgray;
    }

    .note-read{
        max-width: 240px;
    }

</style>