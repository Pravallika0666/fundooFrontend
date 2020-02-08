import { validationMixin } from 'vuelidate'
import {
  required,
} from 'vuelidate/lib/validators';
import { getAll } from '../../services/services';
export default {
  name: 'resetpwd',
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      user: {
        password: null,
        confirmpassword: null
      }, userSaved: false,
      sending: false,
      lastUser: null
    }
  },
  validations: {
    user:{
      password:{
        required
      },
      confirmpassword:{
        required
      }
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    getValidationClass(fieldName){
      const field = this.$v.user[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.user.password = null
      this.user.confirmpassword = null
    },
    saveUser() {
      this.sending = true
      console.log(this.user);
      var obj={
        password:this.user.password,
        confirmPassword:this.user.confirmpassword
      }
      getAll('http://localhost:4000/resetpassword',obj).then(res=>{
        console.log('res',res)
        
      })
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.user.password} ${this.user.confirmpassword}`
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


