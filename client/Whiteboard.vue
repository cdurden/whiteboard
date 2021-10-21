<script>
import WhiteboardBoard from "./components/WhiteboardBoard.vue";
import Sockets from "./services/sockets.js";
export default {
    name: "whiteboard",
    components: {
        "whiteboard-board": WhiteboardBoard,
    },
    props: ["roomId"],
    setup(props) {
        Sockets.emit("roomId", { roomId: props.roomId });
    },
    computed: {
        enabled() {
            return this.$store.state.enabled;
        },
    },
    data() {
        return {
            showPopup: true,
        };
    },
    methods: {
        closePopup() {
            this.showPopup = false;
        },
    },
};
</script>
