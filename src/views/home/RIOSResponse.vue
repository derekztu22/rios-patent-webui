<template>
    <div v-loading="loading"><textarea id="responseSpan" readonly>
    </textarea></div>
</template>
<script>
export default {
    data() {
        return {
            loading:false
        }
    },
    methods: {
        setLoading() {
            this.loading = true
            // console.log("setLoading")
        },
        setResponse(contentVar) {
            this.loading=false
            let responseSpan = document.getElementById("responseSpan")
            responseSpan.innerHTML = contentVar
        }
    }
}
</script>
<style>
#responseSpan {
    width: 80vw;
    height: 72vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>