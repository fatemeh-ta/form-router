<template>
<div>
  <div class="footer-box">
    FOOTER
  </div>
   <h1>{{ timestamp }}</h1>
</div>
</template>

<script type = "text/javascript">
export default {
  data() {
    return {
      timestamp: '',
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow() {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const dateTime = `${date} ${time}`;
      this.timestamp = dateTime;
    },
  },
};
</script>

<style>
.footer-box {
  background-color: gray;
  padding: 16px;
  max-width: 100%;
  text-align: center;
  color: #fff;
  margin: 16px 0;
}
</style>
