<template>
    <div class=" container   container-fixed-lg footer">
        <div class="copyright sm-text-center text-center">
            <p class="small no-margin">
                <span class="hint-text">Copyright &copy; {{getCurrrentYear()}} </span>
                <span class="font-montserrat">Michael Okpara University of Agriculture, Umudike</span>.
            </p>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        getCurrrentYear(){
            var d = new Date();
            return d.getFullYear();
        }
    }
}
</script>
