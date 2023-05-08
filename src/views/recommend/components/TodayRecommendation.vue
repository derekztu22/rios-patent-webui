<template>
    <div class="today-recommendations-container">
        <h2>Today's Recommendation</h2>
        <div class="recommendation-options">
            <button class="option" @click="optionClick('US20210303201A1')">1. US20210303201A1</button>
            <button class="option" @click="optionClick('US11204879B2')">2. US11204879B2</button>
            <button class="option" @click="optionClick('US10621107B1')">3. US10621107B1</button>
            <button class="option" @click="optionClick('US10489304B2')">4. US10489304B2</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TodayRecommendation',
    data() {
        return {

        };
    },
    methods: {
        async optionClick(patentID) {
            var queryStr = "http://localhost:19527/patent/publications/"
            const response = await axios.get(queryStr + patentID, {});
            console.log(response.data);
            this.$emit("search", response.data);
        },
    },
};
</script>

<style>
.today-recommendations-container {
    /* margin-top: 20px; */
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 20px;
    border: 2px solid #c1b9c9;
    border-radius: 5px;
    padding: 5px;
}

.recommendation-options {
    display: flex;
    flex-direction: column;
}

.option {
    margin-bottom: 10px;
    font-size: 16px;
}
</style>