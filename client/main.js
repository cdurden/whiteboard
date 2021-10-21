import { Vue, createApp } from "vue";
import Whiteboard from "./Whiteboard.vue";
import Auth from "./services/auth.js";

async function init(root) {
    var roomId;
    const url = new URL(window.location.href);
    if (url.pathname === "/") {
        roomId = Auth.generateRandomId(5);
        console.log(roomId);
        window.location.pathname = "/" + roomId;
    } else {
        roomId = window.location.pathname.slice(1);
    }
    const props = {
        roomId,
    };
    const app = createApp(Whiteboard, props);
    return app;
}
window.addEventListener("load", (event) => {
    const root = getRoot();
    init(root).then((app) => {
        injectAppElements(root, app);
    });
});
/*jslint browser*/
function getRoot() {
    const root =
        document.getElementById("whiteboard-app") ||
        document.createElement("div");
    root.id = "whiteboard-app";
    root.className = "app-container";
    document.body.appendChild(root);
    return root;
}
function injectAppElements(root, app) {
    // Root element
    app.mount(root);
}

export { getRoot, injectAppElements };
