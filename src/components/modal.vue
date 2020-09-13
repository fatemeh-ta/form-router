<template>
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

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
             <div class="controls">
              <button
                class="button is-link is-light"
                v-on:click.prevent="getUsers"
              >
              مشاهده
              </button>
            </div>
              <ul class="margin-top">
                <li
                  v-for="user in users"
                  :key="user.users"
                >
                  <span v-if= "user.active==true">
                    | {{ user.password }}
                    | {{ user.mobilePhone }}
                    | {{ user.nationalID }}
                    | {{ user.active }}
                    | {{ user.username }}
                  </span>
                </li>
              </ul>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              بستن
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
// eslint-disable-next-line no-unused-vars
export default {
  name: 'modal',
  data() {
    return {
      users: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    howModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
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
        });
    },
  },
};
</script>

<style>
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
</style>
