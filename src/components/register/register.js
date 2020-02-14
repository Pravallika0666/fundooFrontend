import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators';
import router from '../../router';
import services from '../../services/services';

export default {
  name: 'register',
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
      }, userSaved: false,
      sending: false,
      lastUser: null
    }
  }, validations: {
    user: {
      firstName: {
        required,
        minlength: minLength(3)
      },
      lastName: {
        required,
        minlength: minLength(3)
      },
      email: {
        required,
      },
      password: {
        required,
        // maxlength: maxlength(13)
      },
      confirmpassword: {
        required,
        // maxlength: maxlength(13)
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
      this.user.firstName = null
      this.user.lastName = null
      this.user.email = null
      this.user.password = null
      this.user.confirmpassword = null
    },
    saveUser() {
      this.sending = true
      console.log("register", this.user);
      var obj = {
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        confirmpassword:this.user.confirmpassword
      }
      services.getAll('http://localhost:4000/register', obj).then(res => {
        console.log("res", res);
        router.push('/')
      })
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.user.firstName} ${this.user.lastName}`
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
    login() {
      router.push('/')
    }
  }
}


