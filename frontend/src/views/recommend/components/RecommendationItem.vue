<template>
  <div class="recommendation-item">
    <div class="title"><a :href="'https://patents.google.com/patent/' + pubNum.replaceAll('-', '') + '/en'">{{ title }}</a>
    </div>
    <div class="pubNum">Publication Number: {{ pubNum }}</div>
    <div class="abstract">{{ abstract }}</div>
    <div class="feedback-buttons" id="feedback-buttons">
        <input type="radio" :name="'feedback' + index.toString()" value="Good">Good
        <input type="radio" :name="'feedback' + index.toString()" value="Bad">Bad
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendationItem',
  props: {
    title: {
      type: String,
      required: true
    },
    pubNum: {
      type: String,
      required: true
    },
    abstract: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.recommendation-item {
  width: 100%;
  margin: 0 auto;
  /* 居中对齐 */
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.title {
  font-size: 20px;
}

.pubNum {
  margin-top: 5px;
  font-weight: bold;
}

.abstract {
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.5em;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  max-height: 4.5em;
}

.abstract:hover {
  text-overflow: inherit;
  overflow: visible;
  max-height: 100em;
}

.abstract-nohidden {
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.5em;
}

.feedback-buttons{
  display: inline-block;
  margin-top: 5px;

}

</style>
