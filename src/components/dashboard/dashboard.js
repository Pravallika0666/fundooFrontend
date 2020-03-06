import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { EventBus } from "../../eventBus";
import { SearchBus } from "../../eventBus";
import services from "../../services/services";
import { filterBylabel } from "../icon/filter";
export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
      query: "",
      searchs: [],
      // search: String,
      file: "",
      items: [],
      key: [],
      flag: true,
      showSidepanel: false,
      item: String,
      grid: true,
      firstName: "",
      lastName: "",
      email: "",
      showDialog: false,
      inline: "",
      object: [],
      single: "",
      image: String,
      labelArray: [],
      nameLabel: "",
      searchnote: true,
      notes: [],
      card: []
    }
  },
  computed: {
    filterBlogs: function () {
      return this.searchs.filter(search => {
        return search.title.toUpperCase().includes(this.query.toUpperCase()) || search.description.toUpperCase().includes(this.query.toUpperCase())
      })
    }
  },
  mounted() {
    this.firstName = localStorage.getItem('firstname')
    this.lastName = localStorage.getItem('lastname')
    this.email = localStorage.getItem('email')
    this.url = "Notes";
    services.getLabels('http://localhost:4000/note/getLabels').then(res => {
      this.labelArray = res.data;
    });
    this.image = localStorage.getItem('image')
  },
  methods: {
    filterBylabel,
    showNavigation() {
      this.flag = !this.flag
    },
    archive() {
      if (this.$router.currentRoute.fullPath === "/dashboard/archive") {
        this.item = "archive";
      }
    },
    trash() {
      if (this.$router.currentRoute.fullPath === "/dashboard/trash") {
        this.item = "trash";
      }
    },
    note() {
      if (this.$router.currentRoute.fullPath === "/dashboard/note") {
        this.item = "note";
      }
    },
    viewList() {
      this.grid = !this.grid;
      EventBus.$emit('i-got-clicked', this.grid);
    },
    signout() {
      this.$router.push("/")
      localStorage.clear()
    },
    editDialog() {
      this.showDialog = true
    },
    labelSave() {
      var object = {
        nameLabel: this.inline
      }
      services.labelCreate('http://localhost:4000/note/labelCreate', object).then(res => {
        console.log("labelresponse", res);
        this.object.push(res.data.nameLabel)
      })
    },
    uploadImage(event) {
      let data = new FormData();
      console.log("imagee", event.target.files[0]);
      data.append('image', event.target.files[0]);
      services.imageUpload('http://localhost:4000/imageUpload', data).then(res => {
        console.log("image upload response", res.data);
        this.image = res.data
        localStorage.setItem("image", res.data)
      })
    },
    search() {
      console.log("serachhhhhhhhh");
      var object = {
        key: this.query
      }
      services.search('http://localhost:4000/note/search', object).then(res => {
        console.log("search", res)
      })
      console.log("this query", this.query);
      SearchBus.$emit("clicked", this.query)
      return this.query
    }
  }
}


