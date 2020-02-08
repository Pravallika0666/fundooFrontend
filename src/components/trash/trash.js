import displayNote from "../displayNote";
import {getAllnote} from "../../services/services"
export default {
  name: 'trash',
  components: { displayNote },
  props: [],
  data() {
    return {
      trash: []
    }
  },
  computed: {

  },
  mounted() {
    getAllnote('http://localhost:4000/note/getAllnote').then(res => {
      console.log("resssssss", res);
      for (let index = 0; index < res.data.length; index++) {
        if (res.data[index].isDeleted == true) {
          console.log("kdsdksds", res.data[index]);
          this.trash.push(res.data[index])
        }
      }
    })
  },
  methods: {

  }
}


