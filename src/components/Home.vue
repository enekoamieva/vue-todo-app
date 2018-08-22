<template>
    <div>
        <div class="section">
            <div class="">

                <div class="col s12">
                    <div class="slider fullscreen">

                        <ul class="slides">
                            <li>
                                <img src="https://source.unsplash.com/featured/?workspace">
                                <div class="caption center">
                                    <h4><span>Bienvenido a Vue Todo app</span></h4>
                                    <hr>
                                    <h5>Inicio de sesión con Google</h5>
                                    
                                    <!-- Component Login -->
                                    <login-google class="button-google"/>
                                </div>
                            </li>
                        </ul>

                    </div><!-- End slider -->
                </div>

            </div><!-- End row -->
        </div><!-- End Section -->

    </div>
</template>


<script>

    import LoginGoogle from './LoginGoogle';

    export default{

        mounted() {    
            var elems = document.querySelectorAll('.slider');
            M.Slider.init(elems, {
                indicators: false
            });
        },

        components: {
            LoginGoogle
        }

    }

</script>



<style>
    .slides .caption{
        background: rgba(0, 0, 0, .50);
        border-radius: 3px;
        padding: 5px;
    }
</style>