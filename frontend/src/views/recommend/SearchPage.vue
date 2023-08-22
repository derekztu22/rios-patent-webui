<template>
  <div class="search-page">
    <div class="search-container">
      <!-- <div class="search-header">
        <img src="./assets/favicon.png" alt="Logo" />
      </div> -->
      <search-box @search="search"></search-box>
      <!-- <today-recommendation-container @search="search"></today-recommendation-container> -->
    </div>
    <div class="recommendations">
      <div class="recommendation-list">
        <recommendation-item v-for="item in recommendations" :key="item.pubNum" :title="item.title" :pub-num="item.pubNum"
          :abstract="item.abstract"></recommendation-item>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox.vue";
import RecommendationItem from "./components/RecommendationItem.vue";
// import TodayRecommendation from "./components/TodayRecommendation.vue";
import * as r_const from '@/router/consts'
import axios from 'axios';

export default {
  name: "SearchPage",
  components: {
    "search-box": SearchBox,
    "recommendation-item": RecommendationItem,
    // "today-recommendation-container": TodayRecommendation
  },
  data() {
    return {
      recommendations: [],
    };
  },
  methods: {
    async search(searchTerm) {
      // 向后端发送搜索请求
      const { pubNum, rpc, abstract, description, recommendPubNums, title } = searchTerm;
      pubNum, rpc, abstract, description, title;
      this.recommendations = [];
      this.recommendations.push({
        pubNum,
        title,
        abstract,
      });
      for (let i = 0; i < recommendPubNums.length; i++) {
        const pubNum = recommendPubNums[i];
        console.log(pubNum)
        const recommendationResponse = await axios.get(r_const.querySearchPatent,
          {
            params: { patentID: pubNum }
          });
        const { abstract, title } = recommendationResponse.data;
        this.recommendations.push({
          pubNum,
          title,
          abstract,
        });
      }
    },
  },
};
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 74vh;
  width: 80vw;
  overflow-x: hidden;
  overflow-y: auto;
  border: 2px solid #d4d3d3e6;
  border-radius: 5px;
}

.search-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.search-header img {
  max-width: 100%;
  max-height: 100%;
}

.recommendations {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin-top: 20px;
}
</style>
