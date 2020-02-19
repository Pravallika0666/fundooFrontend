import icon from "../icon";
import services, { messageService } from "../../services/services";
import { EventBus } from "../../main";
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
      color: String,
      grid: ""
    }
  },
  computed: {

  },
  created() {
    EventBus.$on('i-got-clicked', grid => {
      this.grid = grid;
    });
  },
  methods: {
    archive(w) {
      let ind = this.cards.indexOf(w)
      this.cards.splice(ind, 1)
    },
    unarchive(w) {
      this.archive(w);
    },
    trash(w) {
      let ind = this.cards.indexOf(w)
      this.cards.splice(ind, 1)
    },
    unTrash(w) {
      this.trash(w)
    },
    updateNote(w) {
      let ind = this.cards.indexOf(w)
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
      services.updateNote('http://localhost:4000/note/updateNote', object).then(res => {
        console.log("updateNote", res);
      })
    },
    chipDelete(card) {
      var object = {
        noteId: card._id,
        Reminder: ""
      }
      console.log("reminderObject", object);
      services.deleteReminder('http://localhost:4000/note/deleteReminder', object).then(res => {
        console.log("chipdelete", res);
        this.$emit("Reminder", card)
        messageService.sendMessage("message!!")
      })
    }
  }
}


