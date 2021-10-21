<template>
    <div class="toolbar">
        <whiteboard-toolbar-menu
            :level="1"
            :menu="menu"
            :actions="actions"
            :active="active"
            :showState="showState"
            @activate-menu="activateMenu"
            @deactivate-menu="deactivateMenu"
        ></whiteboard-toolbar-menu>
    </div>
</template>
<script>
import WhiteboardToolbarMenu from "./WhiteboardToolbarMenu.vue";
import BoardData from "../services/board-data.js";

var drawMenu = new Map([
    ["draw", ["path", "line", "arrow", "rectangle", "circle", "text"]],
]);
var toolMenu = new Map([
    ["tool", ["magnify", "eraser", "pan", "move", "copy"]],
]);
var fillMenu = new Map([
    [
        "fill",
        [
            "#e74c3c",
            "#e67e22",
            "#f1c40f",
            "#1abc9c",
            "#2ecc71",
            "#3498db",
            "#9b59b6",
            "#34495e",
            "#95a5a6",
            "#ecf0f1",
        ],
    ],
]);
var strokeMenu = new Map([
    [
        "stroke",
        [
            "#c0392b",
            "#d35400",
            "#f39c12",
            "#16a085",
            "#27ae60",
            "#2980b9",
            "#8e44ad",
            "#2c3e50",
            "#7f8c8d",
            "#bdc3c7",
        ],
    ],
]);
var thicknessMenu = new Map([
    ["thickness", ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]],
]);
var colorMenu = new Map([
    ["color", new Map([...fillMenu, ...strokeMenu, ...thicknessMenu])],
]);
var menu = new Map([...drawMenu, ...toolMenu, ...colorMenu]);
var actions = new Map([
    [
        "draw",
        function (name) {
            BoardData.setCurrentToolName(name);
        },
    ],
    [
        "tool",
        function (name) {
            BoardData.setCurrentToolName(name);
        },
    ],
    [
        "thickness",
        function (thickness) {
            BoardData.setStrokeWidth(thickness);
        },
    ],
    [
        "fill",
        function (color) {
            BoardData.setColors(color, null);
        },
    ],
    [
        "stroke",
        function (color) {
            BoardData.setColors(null, color);
        },
    ],
]);
var showState = new Map([
    ["draw", false],
    ["tool", false],
    ["color", false],
    ["thickness", false],
    ["fill", false],
    ["stroke", false],
]);

export default {
    components: {
        "whiteboard-toolbar-menu": WhiteboardToolbarMenu,
    },
    data() {
        return {
            menu,
            actions,
            showState,
            active: false,
        };
    },
    methods: {
        activateMenu() {
            this.active = true;
        },
        deactivateMenu() {
            this.active = false;
        },
        setCursorClass(tool) {
            this.$emit("setCursorClass", tool);
        },
    },
};
</script>
