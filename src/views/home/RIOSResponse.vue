<template>
    <textarea id="responseSpan" readonly>
    </textarea>
</template>
<script>
export default {
    name: "RIOSResponse",
    methods: {
        setResponse(contentVar) {
            let responseSpan = document.getElementById("responseSpan")
            responseSpan.innerHTML = contentVar
        }
    }
}
</script>
<style>
#responseSpan {
    width: 80vw;
    height: 70vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>