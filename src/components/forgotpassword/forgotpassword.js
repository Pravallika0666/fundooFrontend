import { validationMixin } from 'vuelidate';
import {
  required
} from 'vuelidate/lib/validators'
import services from '../../services/services';
import router from '../../router';
export default {
  name: 'forgotpassword',
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      forgotpassword: {
        email: ""
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }
  },
  validations: {
    forgotpassword: {
      email: {
        required
      }
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.forgotpassword[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.forgotpassword.email = null
    },
    saveUser() {
      this.sending = true
      console.log("forgotpassword",this.forgotpassword);
      var obj={
        email:this.forgotpassword.email
      }
      services.getAll('http://localhost:4000/forgotpassword',obj).then(res=>{
        console.log("res",res)
        router.push('/')
      })
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.forgotpassword.email}`
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
    }

  }
}


