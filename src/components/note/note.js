import takeAnote from "../takeAnote";
import displayNote from "../displayNote";
import services from "../../services/services"
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
    //subscription is an object that represents a deposable resource that is execution of observable
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        services.getAllnote('http://localhost:4000/note/getAllnote')
          .then(res => {
            console.log("addddddddd", res);

            this.notes = [];
            for (let index = 0; index < res.data.length; index++) {
              if (!res.data[index].isArchived && !res.data[index].isDeleted) {
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
   services.getAllnote('http://localhost:4000/note/getAllnote').then(res => {
     console.log("notess res",res);
     
      var carddata = res.data
      this.notes = []
      for (let i = 0; i < carddata.length; i++) {
        if (!carddata[i].isArchived && !carddata[i].isDeleted) {
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


