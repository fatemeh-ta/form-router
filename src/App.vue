<template>
  <div>
    <headerPage></headerPage>
    <homePage></homePage>
    <router-view></router-view>
    <slider></slider>
    <footerPage></footerPage>
  </div>
</template>
<script>

import homePage from './components/homePage.vue';
import headerPage from './components/headerPage.vue';
import footerPage from './components/footerPage.vue';
import Slider from './components/slider.vue';

export default {
  components: {
    homePage,
    headerPage,
    footerPage,
    Slider,
  },

};

</script>
