<template>
  <div class="search-page">
    <div class="search-container">
      <!-- <div class="search-header">
        <img src="./assets/favicon.png" alt="Logo" />
      </div> -->
      <search-box @showRecommendation="showRecommendation" @setLoading="setLoading"></search-box>
    </div>
    <div v-loading="recommendLoading">
      <div class="recommendations">
        <div class="recommendation-list">
          <recommendation-item v-for="item in recommendations" :key="item.pubNum" :title="item.title"
            :pubNum="item.pubNum" :abstract="item.abstract"></recommendation-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox.vue";
import RecommendationItem from "./components/RecommendationItem.vue";

export default {
  name: "SearchPage",
  components: {
    "search-box": SearchBox,
    "recommendation-item": RecommendationItem,
  },
  data() {
    return {
      recommendations: [],
      recommendLoading: false
    };
  },
  methods: {
    async setLoading(status) {
      this.recommendLoading = status
    },

    async showRecommendation(items) {
      this.recommendations = [];
      for (let i = 0; i < items.length; i++) {
        let pubNum = items[i].publication_number
        let title = items[i].title
        let abstract = items[i].abstract
        this.recommendations.push({
          title,
          pubNum,
          abstract
        });
      }
    }
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
  min-height: 40px;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin-top: 20px;
}
</style>
