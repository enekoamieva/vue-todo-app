<template>
    <div>

        <div class="container" v-cloak>

            <div class="col s12 m7">
                <div class="card center">
                        <!-- <div class="card-image">
                            <img src="https://source.unsplash.com/600x200/?nature/">
                        </div> -->
                        <div class="card-content">
                            <span class="card-title">{{ userInfo.displayName }}</span>
                            <img class="user-img" :src="userInfo.photoURL">
                            <p>Email: <b>{{userInfo.email }}</b></p>
                        </div>
                        <div class="card-action">
                            <a href="/notes">Ver notas</a>
                        </div>
                </div><!-- End card -->
            </div><!-- End col -->

        </div><!-- End row -->

    </div>
</template>


<script>

    import { mapGetters } from 'vuex';

    export default{

        computed: {
            ...mapGetters( ['userInfo'] )
        }
        
    }

</script>



<style>
    .card{
        max-width: 650px;
        margin: 0 auto;
    }

    .card-image span.card-title{
        background: rgba(0, 0, 0, .50) !important;
    }

    img.user-img{
        border-radius: 50%;
        width: 120px;
        position: relative;
        
    }
</style>