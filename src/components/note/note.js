import takeAnote from "../takeAnote";
import displayNote from "../displayNote";
import { getAllnote } from "../../services/services"
import { messageService } from "../../services/services"
export default {
  name: 'note',
  components: { takeAnote, displayNote },
  props: [],
  data() {
    return {
      notes: []
    }
  },
  created() {
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        getAllnote('http://localhost:4000/note/getAllnote')
          .then(res => {
            console.log("addddddddd", res);

            this.notes = [];
            for (let index = 0; index < res.data.length; index++) {
              if (!res.data[index].isArchived) {
                this.notes.push(res.data[index]);
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  },
  computed: {

  },
  mounted() {
    getAllnote('http://localhost:4000/note/getAllnote').then(res => {
      var carddata = res.data
      this.notes = []
      for (let i = 0; i < carddata.length; i++) {
        if (!carddata[i].isArchived) {
          this.notes.push(carddata[i])
        }
      }
    }).catch(err => {
      console.log(err);

    })

  },
  methods: {

  }
}


