<template>
  <div>
    <homePage></homePage>
    <router-view></router-view>
  </div>
</template>
<script>

import homePage from './components/homePage.vue';

export default {
  components: {
    homePage,
  },

};

</script>
