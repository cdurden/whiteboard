<template>
    <div
        id="board-container"
        ref="board"
        @keypress="handleEvent"
        @set-cursor-class="setCursorClass"
    >
        <whiteboard-toolbar></whiteboard-toolbar>
        <whiteboard-layers></whiteboard-layers>
    </div>
    <whiteboard-background :image-url="backgroundImageUrl"
        ><template v-slot:whiteboard-background
            ><slot name="whiteboard-background"></slot></template
    ></whiteboard-background>
</template>
<script>
import WhiteboardToolbar from "./WhiteboardToolbar.vue";
import WhiteboardLayers from "./WhiteboardLayers.vue";
import WhiteboardBackground from "./WhiteboardBackground.vue";
import BoardData from "../services/board-data.js";
import Receive from "../services/receive.js"; // FIXME: Is this where we should put this?
import InputHandler from "../services/input-handler.js";
import { ref, onMounted } from "vue";
function bind(element, eventTypes, handler) {
    eventTypes.split(" ").forEach(function (eventType) {
        element.addEventListener(eventType, handler);
    });
}
export default {
    components: {
        "whiteboard-toolbar": WhiteboardToolbar,
        "whiteboard-layers": WhiteboardLayers,
        "whiteboard-background": WhiteboardBackground,
    },
    props: ["backgroundImageUrl"],
    setup(props) {
        const board = ref(null);
        function handleEvent(ev) {
            InputHandler[ev.type](ev);
        }
        onMounted(() => {
            BoardData.createBoard(board.value);
            [
                "mousedown",
                "mouseup",
                "mousemove",
                "dblclick",
                "touchstart",
                "touchend",
                "touchmove",
            ].forEach(function (eventType) {
                BoardData.getCanvas().addEventListener(eventType, handleEvent);
            });
        });
        return {
            board,
        };
    },
    methods: {
        setCursorClass: function (tool) {
            // FIXME: This is not currently used.
            var svg = BoardData.getCanvas();
            svg.attr("class", tool);
        },
    },
};
</script>
