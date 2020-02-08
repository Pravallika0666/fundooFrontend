import { validationMixin } from 'vuelidate'
import {
  required,
} from 'vuelidate/lib/validators';
import router from '../../router';
import { getAll } from '../../services/services';
export default {
  name: 'login',
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      user: {
        email: null,
        password: null
      }, userSaved: false,
      sending: false,
      lastUser: null
    }
  },
  validations: {
    user: {
      email: {
        required,
      },
      password: {
        required,
      }
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.user.email = null
      this.user.password = null
    },
    saveUser() {
      this.sending = true
      console.log("login", this.user);
      var obj = {
        email: this.user.email,
        password: this.user.password
      }
      getAll('http://localhost:4000/login', obj).then(res => {
        console.log("res", res);
        router.push('/dashboard')
      })
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.user.email} ${this.user.password}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 150000)
    },
    validateUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
      }
    },
    signin() {
      router.push('/register')
    },
    forgotpassword() {
      router.push('/forgotpassword')
    }
  }
}



