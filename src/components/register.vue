/* eslint-disable consistent-return */
<template>
  <form >
      <p v-if="errors.length">
        <b>به خطاهای زیر توجه فرمایید</b>
        <ul>
          <li
            v-for="error in errors"
            :key="error.index"
          >
            {{ error }}
          </li>
        </ul>
      </p>
      <div class="notification">
        <!--USER NAME-->
        <div class="field form-group">
          <label class="label">نام کاربری</label>
          <div class="control">
            <input
              v-model="name"
              class="input"
              type="text"
              placeholder="نام کاربری"
              @change="checkUserInput"
            >
          </div>
        </div>
        <!--NATIONAL CODE-->
        <div class="field">
          <label class="label">کد ملی</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="nationalCode"
              class="input"
              type="text"
              placeholder="کد ملی"
              @change="checkCodeInput"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-user" />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </div>
        </div>
        <!----telephon------>
        <div class="field">
          <label class="label">موبایل</label>
          <div class="control has-icons-left has-icons-right">
            <input
              id="phone"
              v-model="phone"
              class="input"
              type="tel"
              placeholder="موبایل"
              @change="checkPhoneInput"
            >
            <span class="icon is-small is-left">
              <i
                class="fa fa-mobile"
                aria-hidden="true"
              />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </div>
          <!--<p class="help is-danger" id="phone-messsage"></p>-->
        </div>
        <!----pass------>
        <div class="field">
          <label class="label">رمز عبور</label>
          <div class="control has-icons-left has-icons-right">
            <input
              id="pwd"
              v-model="pwd"
              class="input"
              type="password"
              placeholder="رمز عبور"
              @change="checkPassInput"
            >
            <span class="icon is-small is-left">
              <i
                class="fa fa-lock"
                aria-hidden="true"
              />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
            <div class="check-pass">رمز عبور باید حداقل ۸ کاراکتر و شامل اعداد و حروف باشد</div>
          </div>
          <!--<p class="help is-danger" id="password-messsage"></p>-->
        </div>
        <!----Confirm pass------>
        <div class="field">
          <label class="label">تکرار رمز عبور</label>
          <div class="control has-icons-left has-icons-right">
            <input
              id="confirm-pwd"
              v-model="confirmPwd"
              class="input"
              type="password"
              placeholder="تکرار رمز عبور"
              @change="checkConfirmInput"
            >
            <span class="icon is-small is-left">
              <i
                class="fa fa-lock"
                aria-hidden="true"
              />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </div>
          <!--<p class="help is-danger" id="confirm-messsage"></p>-->
        </div>
        <div class="checkbox-active">
          <input type="checkbox" id="active-box"  v-model="activeCheck">
          <label for="active-box"> فعال</label><br>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              @click="checkForm"
            >
              ثبت نام
            </button>
          </div>
          <div class="control">
            <button
              class="button is-link is-light"
              @click="cleardata"
            >
              لغو
            </button>
          </div>
        </div>
      </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      name: null,
      confirmPwd: null,
      pwd: null,
      phone: null,
      nationalCode: null,
      input: null,
      activeCheck: null,
    };
  },
  methods: {
    postUser(value) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      };
      fetch('http://127.0.0.1:9000/user/sign-up', requestOptions)
        .then((response) => {
          if (response.status === 200) {
            // console.log(requestOptions);
            this.cleardata();
          }
        });
    },
    checkForm(e) {
      this.errors = [];

      //* ***************USERNAME*****************//
      if (!this.name) {
        this.errors.push('پر کردن نام کاربری الزامی است');
      } else if (!this.validUser(this.name)) {
        this.errors.push('نام کاربری معتبر نیست');
      }

      //* ***************TELEPHONE*****************//
      if (!this.phone) {
        this.errors.push('پر کردن شماره تلفن همراه الزامی است');
      } else if (!this.validPhone(this.phone)) {
        this.errors.push('تلفن همراه معتبر نیست');
      }

      //* ***************NATIONAL CODE*****************//
      if (!this.nationalCode) {
        this.errors.push('پر کردن کد ملی الزامی است');
      } else if (!this.validNationalCode(this.nationalCode)) {
        this.errors.push('کد ملی معتبر نیست');
      }

      //* ***************PASSWORD*****************//
      if (!this.pwd) {
        this.errors.push('رمز عبور را انتخاب نمایید');
      } else if (!this.validPassword(this.pwd)) {
        this.errors.push(' رمز عبور معتبر نیست');
      }

      //* ***************CONFIRMPASSWORD*****************//
      if (!this.confirmPwd) {
        this.errors.push('رمز عبور خود را مجددا وارد نمایید');
      } else if (!this.validConfirmpwd(this.confirmPwd)) {
        this.errors.push('رمز عبور مجدد معتبر نیست');
      }

      //* **************CHECKBOX*****************//

      if (!this.errors.length) {
        // eslint-disable-next-line no-alert
        alert('ثبت نام با موفقیت انجام شد');
        const user = {
          username: this.name,
          password: this.pwd,
          // confirmPwd: this.confirmPwd,
          mobilePhone: this.phone,
          nationalID: this.nationalCode,
          active: this.activeCheck,
        };
        this.postUser(user);
      }

      e.preventDefault();
    },
    // delete data form
    cleardata(err) {
      this.name = null;
      this.confirmPwd = null;
      this.pwd = null;
      this.phone = null;
      this.nationalCode = null;
      err.preventDefault();
    },
    // cheak input
    checkUserInput(event) {
      const input = event.target;
      if (!this.validUser(this.name)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },
    checkPhoneInput(event) {
      const input = event.target;
      if (!this.validPhone(this.phone)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },
    checkCodeInput(event) {
      const input = event.target;
      if (!this.validNationalCode(this.nationalCode)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },
    checkPassInput(event) {
      const input = event.target;
      if (!this.validPassword(this.pwd)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },
    checkConfirmInput(event) {
      const input = event.target;
      if (!this.validConfirmpwd(this.confirmPwd)) {
        input.classList.add('main_red');
      } else {
        input.classList.remove('main_red');
      }
    },

    validUser(name) {
      const re = /^(?=.{3,20}$)(?![_.])(?![0-9])[a-zA-Z0-9._]+(?<![_.])$/;
      return re.test(name);
    },

    validPhone(phone) {
      // console.log(phone);
      const ph = /^\(?([0]{1})\)?([9]{1})?([0-9]{9})$/;
      return ph.test(phone);
    },

    validPassword(pwd) {
      const pass = /^(?=.*\d)(?=.*[a-z]).{8,20}$/;
      // console.log(pass.test(pwd));
      return pass.test(pwd);
    },

    validConfirmpwd() {
      // console.log(confirmPwd);
      // console.log(this.pwd === this.confirmPwd) ;
      return (this.pwd === this.confirmPwd);
    },

    validNationalCode(nationalCode) {
      if (/^\d{10}$/.test(nationalCode)) {
        const check = parseInt(nationalCode[9], 10);
        let sum = 0;
        let i;
        for (i = 0; i < 9; i += 1) {
          sum += parseInt(nationalCode[i], 10) * (10 - i);
        }
        sum %= 11;
        return ((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11));
      }
      return false;
    },
  },
};

</script>

<style>
  .checkbox-active {
    margin: 8px 0;
  }
  .check-pass {
    padding: 12px 0;
    font-size: 0.8em;
    color: red;
  }
</style>
