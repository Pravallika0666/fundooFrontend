import icon from "../icon";
import { addNote, messageService } from "../../services/services"
import { validationMixin } from 'vuelidate'

export default {
  name: 'take-anote',
  mixins: [validationMixin],
  components: { icon },
  props: [],
  data() {
    return {
      loading: false,
      flag: true,
      takeNote: {
        title: "",
        description: "",
      }, userSaved: false,
      sending: false,
      lastUser: null,
      reminder:String,
      pinned:false,
      archive:String,
      bgcolor:String,
      delete:false
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    openCard() {
      this.flag = !this.flag
    },   
  
    addNote(){
      this.flag = !this.flag
      var note = {
        title: this.takeNote.title,
        description: this.takeNote.description,
        Reminder: this.isreminder,
        isPinned: this.isPinned,
        isArchived: this.isArchive,
        color: this.bgcolor,
        isDeleted: this.delete
      }
      addNote('http://localhost:4000/note/addNote', note).then(res => {
        console.log("addnote", res);
        messageService.sendMessage("hiiiiiiiiiiii")
      })

    }
  }
}


