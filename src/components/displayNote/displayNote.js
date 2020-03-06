import icon from "../icon";
import services, { messageService } from "../../services/services";
import { EventBus } from "../../eventBus";
import {SearchBus} from "../../eventBus";
import draggable from "vuedraggable";
export default {
  name: 'display-note',
  components: { icon, draggable },
  props: {
    cards: Array
  },
  data() {
    return {
      nameLabel:String,
      items: "",
      collaboratorProfile: null,
      image: String,
      event: '',
      showDialog: false,
      collaboratorEmail: [],
      collaborators: [],
      dialogData: Object,
      updatetitle: "",
      updatedescription: "",
      updateCard: Object,
      color: String,
      grid: "",
      query: "",
      labelsArray:""
    }
  },
  computed: {
    filterList(){
      return this.cards.filter(card=>{
        return (
          card.title.toLowerCase().includes(this.query.toLowerCase()) ||
          card.description.toLowerCase().includes(this.query.toLowerCase())
        )
      })
    }
  },
  mounted() {
    this.image = localStorage.getItem('image')
    services.getLabels('http://localhost:4000/note/getLabels').then(res=>
    this.labelsArray=res.data,
    // console.log("response labelss",this.res)
    
    )
  },
  created() {
    EventBus.$on('i-got-clicked', grid => {
      this.grid = grid;
    });
    SearchBus.$on("clicked", query => {
      this.query = query;
      console.log("search response",this.query);
      
    })
  },
  methods: {
    // filterByLabel,
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
    collaboratorAdd(card) {
      this.$emit("collaborator", card)
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
    },
    labelChipDelete(card){
      var object={
        _id:card._id,
        userId:card._id
      }
      services.deleteLabels("http://localhost:4000/note/deleteLabels",object).then(res=>{
        console.log("chip delete labels",res);
        this.$emit("nameLabel",card)
        messageService.sendMessage("message!!")

      })
    },
    collaboratorId(card) {
      var object = {
        
        userId:card._id
      }
      services.getCollaborator('http://localhost:4000/note/getCollaborator', object).then(res =>
        this.collaboratorEmail = res.data,
        EventBus.$on('clicked', this.collaboratorEmail),
        console.log("collabbbbbbbbiiiiiii", this.collaboratorEmail)
      )
    },

  }
}


