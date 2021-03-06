import services from "../../services/services";
import datetime from 'vuejs-datetimepicker';
import { filterBy } from "../icon/filter";
import {EventBus} from "../../eventBus";
export default {
  name: 'icon',
  components: { datetime },
  props: {
    cardObject: Object
  },
  data() {
    return {
      items: [],
      flag: true,
      collaboratorEmail: "",
      route: true,
      emailCollaborator: false,
      route1: true,
      date: null,
      dateObject: new Date(),
      inline: "",
      inputUser: "",
      string: [],
      collaborator:Object,
      label: [],
      image: String,
      showDialog: false,
      reminder: null,
      email: String,
      search: '',
      labelArray: [],
      Arraycolor: [
        [
          { color: "#FFFFFF", name: "White" },
          { color: "#F28B82", name: "Red" },
          { color: "#FBBC04", name: "Orange" },
          { color: "#FFF475", name: "Yellow" }
        ],

        [
          { color: "#CCFF90", name: "Green" },
          { color: "#A7FFEB", name: "Teal" },
          { color: "#CBF0F8", name: "Blue" },
          { color: "#AECBFA", name: "Darkblue" }
        ],

        [
          { color: "#D7AEFB", name: "Purple" },
          { color: "#FDCFE8", name: "Pink" },
          { color: "#E6C9A8", name: "Brown" },
          { color: "#E8EAED", name: "Gray" }
        ]
      ],
    }
  },
  computed: {

  },
  mounted() {
    this.email = localStorage.getItem('email')
    this.firstName = localStorage.getItem('firstname')
    this.lastName = localStorage.getItem('lastname')

    if (this.$router.currentRoute.fullPath === "/dashboard/archive") {
      this.route = true
    } else {
      this.route = false
    }
    if (this.$router.currentRoute.fullPath === "/dashboard/trash") {
      this.route1 = true
    } else {

      this.route1 = false
    }
    services.getLabels('http://localhost:4000/note/getLabels').then(res => {
      this.labelArray = res.data;
    })
    services.getUsers('http://localhost:4000/getUsers').then(res => {
      this.items = res.data
    })
  },
  methods: {
    filterBy,
    archive(cardObject) {
      var object = {
        noteId: cardObject._id,
        isArchived: true
      }
      services.archive('http://localhost:4000/note/archive', object).then(res => {
        console.log("resssssss", res)
        this.$emit("archivecard", cardObject)
      })
    },
    unarchive(cardObject) {
      var object = {
        noteId: cardObject._id,
        isArchived: false
      }
      services.archive('http://localhost:4000/note/archive', object).then(res => {
        console.log("res1111", res);
        this.$emit("unarchive", cardObject)

      })
    },
    trash(cardObject) {
      var object = {
        noteId: cardObject._id,
        isDeleted: true
      }
      services.isTrash('http://localhost:4000/note/isTrash', object).then(res => {
        console.log('trash response', res)
        this.$emit('trash', cardObject)
      })
    },
    unTrash(cardObject) {
      var object = {
        noteId: cardObject._id,
        isDeleted: false
      }
      services.isTrash('http://localhost:4000/note/isTrash', object).then((res) => {
        console.log("untrash response", res);
        this.$emit('untrash', cardObject)
      })
    },
    updateNote(cardObject) {
      var object = {
        noteId: cardObject._id,
      }
      services.updateNote('http://localhost:4000/note/updateNote', object).then((res) => {
        console.log("update response", res);
        this.$emit('updateNote', cardObject)
      })
    },
    colorsDisplay(color, cardObject) {
      if (color == undefined) {
        this.$emit('cardcolor', color)
      } else {
        cardObject.color = color;
        this.updateColor(color, cardObject)
      }
    },
    updateColor(color, cardObject) {
      var object = {
        noteId: cardObject._id,
        color: color
      }
      console.log("colorobject", object);
      services.updateColor('http://localhost:4000/note/color', object).then((res) => {
        console.log("color repsonse", res);
      })
    },
    saveLabel() {
      this.flag = !this.flag;
    },

    reminderLaterToday(cardObject) {
      let reminder = new Date(
        this.dateObject.getFullYear(),
        this.dateObject.getMonth(),
        this.dateObject.getDate(),
        20,
        0,
        0,
        0
      )
      var object = {
        noteId: cardObject._id,
        Reminder: reminder
      }
      console.log("reminderrr", reminder);
      services.addReminder('http://localhost:4000/note/addReminder', object).then((res) => {
        console.log("reminder set", res);
      })
    },
    createLabel: function () {
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj");
      var object = {
        nameLabel: this.inline
      };
      services.labelCreate('http://localhost:4000/note/labelCreate', object).then((res) => {
        console.log("labelsResponse", res);
        this.labels.push(res.data.nameLabel)
      })
    },
    addCollaborator(cardObject) {
      this.showDialog = false;
      var object = {
        collaboratorEmail: this.inputUser,
        userId: cardObject.userId,
        noteId: cardObject._id
      };
      services.addCollaborator('http://localhost:4000/note/addCollaborator', object).then((res) => {
        console.log("addCollaborator", res.data.collaboratorEmail);
        this.collaboratorEmail = res.data.collaboratorEmail
        console.log("collaaaaaabbb", this.collaboratorEmail)   
        EventBus.$emit('clicked',this.collaboratorEmail) 
        // this.$emit("")
      })
    },
    saveCollaborator(email) {
      this.inputUser = email
    }
  }
}


