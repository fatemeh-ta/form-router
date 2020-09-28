<template>
  <div>
    <div class="slides">
      <div>
        <img :src="images[cimg]">
      </div>
    </div>
    <span
      class="prev"
      @click="preImage()"
    >
      <i
        class="fa fa-chevron-left"
        aria-hidden="true"
      />
    </span>
    <span
      class="next"
      @click="nextImage()"
    >
      <i
        class="fa fa-chevron-right"
        aria-hidden="true"
      />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://images.freeimages.com/images/large-previews/3a6/rain-on-sea-ii-1368899.jpg',
        'https://images.freeimages.com/images/large-previews/fb3/grass-1379193.jpg',
        'https://images.freeimages.com/images/large-previews/d5d/grass-1395560.jpg',
      ],
      cimg: 0,
    };
  },
  methods: {
    nextImage() {
      this.cimg += 1;
      if (this.cimg > 2) {
        this.cimg = 0;
      }
    },
    preImage() {
      this.cimg -= 1;
      if (this.cimg < 0) {
        this.cimg = 2;
      }
    },
  },
};
</script>
