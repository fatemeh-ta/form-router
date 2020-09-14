<template>
  <div>
    <div class="control register">
      <button
      >
        <router-link to="/register"> ثبت نام </router-link>
      </button>
    </div>
    <div class="control show-info">
      <button
        class="is-light"
      >
      <router-link to="/viewList"> نمایش اطلاعات کاربران </router-link>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
};

</script>
