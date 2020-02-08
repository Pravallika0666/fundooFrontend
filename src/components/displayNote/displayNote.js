import icon from "../icon"
import { Object } from "core-js";
import { updateNote } from "../../services/services";
// import { color } from "../../services/services";
export default {
  name: 'display-note',
  components: { icon },
  props: {
    cards: Array
  },
  data() {
    return {
      showDialog: false,
      dialogData: Object,
      updatetitle: "",
      updatedescription: "",
      updateCard: Object,
      color: String
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    archive(e) {
      let ind = this.cards.indexOf(e)
      this.cards.splice(ind, 1)
    },
    unarchive(e) {
      this.archive(e);
    },
    trash(e) {
      let ind = this.cards.indexOf(e)
      this.cards.splice(ind, 1)
    },
    unTrash(e) {
      this.trash(e)
    },
    updateNote(e) {
      let ind = this.cards.indexOf(e)
      this.cards.splice(ind, 1)
    },
    save(card) {
      console.log("updateeeeeeeee", card);
      this.showDialog = true
      this.updatetitle = card.title,
      this.updatedescription = card.description
      this.updateCard = card
    },
    editNote() {
      console.log("updqaklsef", this.updateCard);
      this.showDialog = false
      this.updateCard.title = this.updatetitle
      this.updateCard.description = this.updatedescription
      console.log("updateCard", this.updateCard);
      var object = {
        noteId: this.updateCard._id,
        title: this.updateCard.title,
        description: this.updateCard.description
      }
      updateNote('http://localhost:4000/note/updateNote', object).then(res => {
        console.log("updateNote", res);
      })
    },
    // colorDisplay(){
    //   var object={
    //     noteId:this.color._id,
    //     color:this.color.color
    //   }
    //   color('http://localhost:4000/note/color',object).then((res)=>{
    //     console.log("colordisplay",res)
    //   })
    // }
  }
}


