import services from "../../services/services";
import datetime from 'vuejs-datetimepicker';
export default {
  name: 'icon',
  components: { datetime },
  props: {
    cardObject: Object
  },
  data() {
    return {
      flag: true,
      route: true,
      route1: true,
      date: null,
      dateObject: new Date(),
      inline: "",
      string: [],
      reminder: null,
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
      console.log("");
      this.labelArray = res.data;
    })
  },
  methods: {
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
        userId: cardObject._id,
        Reminder: reminder
      }
      console.log("reminderrr", reminder);
      services.addReminder('http://localhost:4000/note/addReminder', object).then((res) => {
        console.log("reminder set", res);
      })
    }
  },
  createLabel: function () {
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj");
    var object = {
      nameLabel: this.inline
    };
    services.labelCreate('http://localhost:4000/note/labelCreate', object).then((res) => {
      console.log("labelsResponse", res);
      this.object.push(res.data.nameLabel)
    })

  }
}


