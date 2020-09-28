<template>
  <div class="margin-top">
    <modal
    v-if="show"
     :name= "modalUserShow"
     @close="show=false"
    />
    <div class="controls">
      <button
        class="button is-link is-light"
        v-on:click.prevent="getUsers"
      >
      مشاهده
      </button>
    </div>
    <!--SHOW LIST USER-->
    <div v-if="!isloading">
      <table class="margin-top">
        <tr>
          <th> نام کاربری</th>
          <th>کد ملی</th>
          <th>موبایل</th>
          <th>رمز عبور</th>
          <th>
            <button @click="filterData(false)">غیر فعال</button>
            <button @click="filterData(true)">فعال</button>
          </th>
        </tr>
        <tr
          v-for="user in users"
          :key="user.users"
        >
          <td>
            <button
              type="button"
              class="btn color-user"
              name="Modal"
              @click="showdata(user),show = true"

            >
              {{ user.username }}
            </button>

          </td>
          <td>{{ user.nationalID }}</td>
          <td>{{ user.mobilePhone }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.active }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Modal from './modal.vue';

export default {
  name: Modal,
  data() {
    return {
      modalUserShow: '',
      show: false,
      users: null,
      isloading: true,
      filter: '',
    };
  },
  components: {
    Modal,
  },
  methods: {
    getUsers() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      fetch('http://127.0.0.1:9000/user/list', requestOptions)
        // eslint-disable-next-line consistent-return
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          this.users = data;
          this.infoData = data;
          this.isloading = false;
        });
    },
    filterData(showfilter) {
      if (showfilter) {
        this.users = this.infoData.filter((user) => user.active === true);
      } else {
        this.users = this.infoData.filter((user) => user.active === false);
      }
    },
    showdata(userData) {
      this.show = true;
      this.modalUserShow = userData;
    },
  },
};

</script>

<style>
table,th,tr,td {
  border: 1px solid #000;
  text-align: center;
}
table tr:first-child {
  background-color: #4AAE9B;
}
table th:first-child {
  padding: 8px;
}
tr {
  padding: 8px;
}

th {
  width: 130px;
  vertical-align: middle !important;
}
td {
  margin: 8px;
  padding: 8px !important;
  width: 150px;
}
.color-user {
  background-color: #f1f1f1;
  border: 1px solid #f0f0f0;
  padding: 4px 8px;
  cursor: pointer;
  margin-bottom: 8px;
}
</style>
