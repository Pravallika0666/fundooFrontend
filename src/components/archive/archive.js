import displayNote from "../displayNote";
import services from "../../services/services"
export default {
  name: 'archive',
  components: { displayNote },
  props: [],
  data() {
    return {
      archive: []
    }
  },
  computed: {

  },
  mounted() {
    services.getAllnote('http://localhost:4000/note/getAllnote').then(res => {
      console.log("resssssss", res);
      for (let index = 0; index < res.data.length; index++) {
        if (res.data[index].isArchived == true) {
          console.log("kdsdksdskdks;k", res.data[index]);
          this.archive.push(res.data[index])
        }
      }
    })
  },
  methods: {

  }
}


