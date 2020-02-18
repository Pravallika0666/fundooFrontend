import icon from "../icon";
import { messageService } from "../../services/services";
import services from "../../services/services";
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
      reminder: "",
      pinned: false,
      archive: false,
      bgcolor: "#FFFF",
      delete: false
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
    addNote() {
      this.flag = !this.flag
      var note = {
        userId: localStorage.getItem('_id'),
        title: this.takeNote.title,
        description: this.takeNote.description,
        Reminder: this.reminder,
        isPinned: this.pinned,
        isArchived: this.archive,
        color: this.bgcolor,
        isDeleted: this.delete
      }
      console.log(note, "notesss");

      services.addNote('http://localhost:4000/note/addNote', note).then(res => {
        console.log("addnote", res);
        messageService.sendMessage("hiiiiiiiiiiii")
      })

    }
  }
}


