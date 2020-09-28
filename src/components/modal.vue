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
            <div v-if="name.active===true">
              {{ name.username | upperUser }}  *****
              {{ name.nationalID }}   *****
              {{ name.mobilePhone | changePhone }}
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
              @click="$emit('close')"
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

export default {
  name: 'Modal',
  data() {
    return {
      modalUserShow: '',
      show: false,
      users: null,
      isloading: true,
      filter: '',
    };
  },
  props: {
    name: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.show = false;
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
