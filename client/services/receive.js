import Sockets from "./sockets.js";
import EventHandler from "./event-handler.js";

Sockets.on("showExisting", function (data) {
    Object.keys(data).forEach(function (socketId) {
        if (Object.keys(data[socketId]).length) {
            Object.keys(data[socketId]).forEach(function (id) {
                var thisShape = data[socketId][id];
                if (thisShape.tool.name === "path") {
                    EventHandler.drawExistingPath(thisShape);
                } else if (thisShape.initX && thisShape.initY) {
                    EventHandler.createShape(
                        id,
                        socketId,
                        thisShape.tool,
                        thisShape.initX,
                        thisShape.initY
                    );
                    if (thisShape.tool.name !== "text") {
                        EventHandler.editShape(
                            id,
                            socketId,
                            thisShape.tool,
                            thisShape.mouseX,
                            thisShape.mouseY
                        );
                    }
                    EventHandler.finishShape(
                        thisShape.myid,
                        thisShape.socketId,
                        thisShape.tool
                    );
                }
            });
        }
    });
});

Sockets.on("heartbeat", function () {
    Sockets.emit("heartbeat");
});

Sockets.on("socketId", function (data) {
    EventHandler.setSocketId(data.socketId);
});

Sockets.on("shapeEdited", function (data) {
    EventHandler.editShape(
        data.myid,
        data.socketId,
        data.tool,
        data.mouseX,
        data.mouseY
    );
});

Sockets.on("shapeCompleted", function (data) {
    EventHandler.finishShape(data.myid, data.socketId, data.tool);
});

Sockets.on("copiedPathCompleted", function (data) {
    EventHandler.finishCopiedPath(
        data.myid,
        data.socketId,
        data.tool,
        data.pathDProps
    );
});

Sockets.on("shapeCreated", function (data) {
    EventHandler.createShape(
        data.myid,
        data.socketId,
        data.tool,
        data.initX,
        data.initY
    );
});

Sockets.on("shapeMoved", function (data) {
    EventHandler.moveShape(data, data.x, data.y);
});

Sockets.on("shapeFinishedMoving", function (data) {
    EventHandler.finishMovingShape(data.myid, data.socketId);
});

Sockets.on("shapeDeleted", function (data) {
    EventHandler.deleteShape(data.myid, data.socketId);
});

export {};
