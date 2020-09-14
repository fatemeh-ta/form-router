<template>
  <div class="margin-top">
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
              @click="showdata(user)"
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
    <!--SHOW LIST USER IN MODAL-->
    <div v-if="show">
      <transition name="modal-fade">
        <div class="modal-backdrop">
          <div class="modal"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
          >
            <header
              class="modal-header"
              id="modalTitle"
            >
              <slot name="header">
                نمایش اطلاعات کاربر ثبت نام شده

                <!-- <button
                  type="button"
                  class="btn-close"
                  @click="closeModal"
                  aria-label="Close modal"
                >
                  x
                </button> -->
              </slot>
            </header>
            <section
              class="modal-body"
              id="modalDescription"
            >
               <!--CONTENT MODAL-->
              <slot name="body">
                <div v-if="modalUserShow.active===true">
                  {{ modalUserShow.username | upperUser }}  *****
                  {{ modalUserShow.nationalID }}   *****
                  {{ modalUserShow.mobilePhone | changePhone }}
                </div>
                <div v-else>
                کاربر فعال نمی باشد
                </div>
              </slot>
            </section>
            <footer class="modal-footer">
              <slot name="footer">
                <button
                  type="button"
                  class="btn-green"
                  @click="closeModal"
                  aria-label="Close modal"
                >
                  بستن
                </button>
              </slot>
            </footer>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      modalUserShow: '',
      show: false,
      users: null,
      isloading: true,
      filter: '',
    };
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
    showdata(userData) {
      this.show = true;
      this.modalUserShow = userData;
    },
    closeModal() {
      this.show = false;
    },
    filterData(showfilter) {
      if (showfilter) {
        this.users = this.infoData.filter((user) => user.active === true);
      } else {
        this.users = this.infoData.filter((user) => user.active === false);
      }
    },
  },
  filters: {
    upperUser(value) {
      // eslint-disable-next-line no-param-reassign
      value = value.toString();
      return value.toUpperCase().trim();
    },
    changePhone(phone) {
      // eslint-disable-next-line no-param-reassign
      phone = phone.toString();
      return `+98${phone.slice(1)}`;
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
.modal-backdrop {
  position: fixed;
  top: 160px;
  bottom: 160px;
  left: 200px;
  right: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.modal {
  background: #FFFFFF;
  box-shadow: 1px 1px 11px -3px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 30%;
  position: fixed;
  top: 160px !important;
  bottom: 160px !important;
  left: 200px !important;
  right: 600px !important;
  height: 400px;
}

.modal-backdrop > div {
  display: block;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

footer >button {
  cursor: pointer;
}

.modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  table th button {
    cursor: pointer;
  }
/* fa fa-check
fa fa-times */
</style>
