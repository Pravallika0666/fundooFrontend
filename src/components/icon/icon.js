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
      route: true,
      route1: true,
      date:null,
      reminder:null,
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
      // console.log(this.$router.currentRoute.fullPath, "hikkkkkkkkkkkkkkk");
      this.route = true
    } else {
      // console.log(this.$router.currentRoute.fullPath, "hhhhhhhhhhhhhhhhhhhhhh");
      this.route = false
    }
    if (this.$router.currentRoute.fullPath === "/dashboard/trash") {
      // console.log(this.$router.currentRoute.fullPath, "jkjf");
      this.route1 = true
    } else {

      this.route1 = false
    }
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
    }
  }
}


