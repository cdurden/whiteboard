import BoardData from "./board-data.js";
import Snap from "./snap.js";
import EventHandler from "./event-handler.js";
import Broadcast from "./broadcast.js";
import Visualizer from "./visualizer";
import Zoom from "./zoom.js";

var actions = {};

var lastEv;
var toggleAttrs = {};
function toggle(attr) {
    if (!toggleAttrs[attr]) {
        toggleAttrs[attr] = true;
    } else {
        toggleAttrs[attr] = false;
    }
}
function isToggled(attr) {
    return toggleAttrs[attr];
}

function getClosestElementByArea(ev) {
    var paper = BoardData.getBoard();
    var width = (height = 5);
    var mouseXY = getMouseXY(ev);
    var bbox = {
        x: mouseXY.x - width / 2,
        y: mouseXY.y - height / 2,
        x2: mouseXY.x + width / 2,
        y2: mouseXY.y + height / 2,
        width: width,
        height: height,
    };
    var bboxCenter = {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2,
    };
    // var set = this.set();
    var closest = null;
    var closestDist;
    paper.forEach(function (el) {
        var elBBox = el.getBBox();
        if (!(el.type === "set") && Raphael.isBBoxIntersect(elBBox, bbox)) {
            var elBBoxCenter = {
                x: elBBox.x + elBBox.width / 2,
                y: elBBox.y + elBBox.height / 2,
            };
            var dist = Math.sqrt(
                Math.pow(elBBoxCenter.x - bboxCenter.x, 2) +
                    Math.pow(elBBoxCenter.y - bboxCenter.y, 2)
            );
            if (!closestDist || dist < closestDist) {
                closest = el;
                closestDist = dist;
            }
        }
    });
    return closest;
}

actions.eraser = {
    mouseDown: function (ev) {},
    mouseHold: function (ev) {
        if (lastEv) {
            var mousePathString =
                "M" +
                lastEv.clientX +
                "," +
                lastEv.clientY +
                "L" +
                ev.clientX +
                "," +
                ev.clientY;
            BoardData.getBoard().forEach(function (shape) {
                if (shape.type === "path") {
                    if (
                        Raphael.pathIntersection(
                            mousePathString,
                            shape.attr("path")
                        ).length
                    ) {
                        Broadcast.deleteShape(shape.myid, shape.socketId);
                        EventHandler.deleteShape(shape.myid, shape.socketId);
                    }
                }
            });
        }
        var shape = BoardData.getBoard().getElementByPoint(
            ev.clientX,
            ev.clientY
        );
        if (shape) {
            Broadcast.deleteShape(shape.myid, shape.socketId);
            EventHandler.deleteShape(shape.myid, shape.socketId);
        }
        lastEv = ev;
    },
    mouseUp: function (ev) {
        lastEv = null;
    },
    mouseOver: function (ev) {},
};

actions.pan = {
    mouseDown: function (ev) {},
    mouseHold: function (ev) {
        Zoom.pan(ev);
    },
    mouseUp: function (ev) {
        Zoom.resetPan();
    },
    mouseOver: function (ev) {},
};

actions.move = {
    mouseDown: function (ev) {
        Visualizer.clearSelection();
        var target = getClosestElementByArea(ev);

        if (target) {
            BoardData.setEditorShape(target);
        } else {
            toggle("move");
        }
    },
    mouseHold: function (ev) {
        var currentEditorShape = BoardData.getEditorShape();
        var mouseXY = getMouseXY(ev);

        Visualizer.clearSelection();
        EventHandler.moveShape(currentEditorShape, mouseXY.x, mouseXY.y);
        Broadcast.moveShape(currentEditorShape, mouseXY.x, mouseXY.y);
    },
    mouseUp: function (ev) {
        var editorShape = BoardData.getEditorShape();
        var currentTool = BoardData.getCurrentTool();

        Broadcast.finishMovingShape(editorShape);
        EventHandler.finishMovingShape(editorShape.myid, editorShape.socketId);
        BoardData.unsetEditorShape();
    },
    mouseOver: function (ev) {
        Visualizer.clearSelection();
        var selection = getClosestElementByArea(ev);
        Visualizer.visualizeSelection(selection);
    },
};

actions.copy = {
    mouseDown: function (ev) {
        Visualizer.clearSelection();
        var shape = getClosestElementByArea(ev);
        var socketId = BoardData.getSocketId();

        var newId = BoardData.generateShapeId();

        var newInitX = shape.initX + 10;
        var newInitY = shape.initY + 10;
        var newMouseX = shape.mouseX + 10 || newInitX;
        var newMouseY = shape.mouseY + 10 || newInitY;

        EventHandler.createShape(
            newId,
            socketId,
            shape.tool,
            newInitX,
            newInitY
        );
        Broadcast.newShape(newId, socketId, shape.tool, newInitX, newInitY);
        if (shape.tool.name === "path") {
            BoardData.setCurrentShape(newId);

            var currentShape = BoardData.getCurrentShape();
            var parsedPathArray = Raphael.parsePathString(shape.pathDProps);

            var temp = parsedPathArray.map(function (coordinate) {
                return coordinate.map(function (element) {
                    return typeof element === "number" ? element + 10 : element;
                });
            });

            var stringifiedPath = temp
                .map(function (coordinate) {
                    return coordinate[0] + coordinate[1] + "," + coordinate[2];
                })
                .join("");

            currentShape.pathDProps = stringifiedPath;
        }

        if (!!shape.tool.text) {
            EventHandler.editShape(
                newId,
                socketId,
                shape.tool,
                newInitX,
                newInitY
            );
        } else {
            EventHandler.editShape(
                newId,
                socketId,
                shape.tool,
                newMouseX,
                newMouseY
            );
        }

        Broadcast.editShape(newId, socketId, shape.tool, newMouseX, newMouseY);

        EventHandler.finishShape(newId, socketId, shape.tool);
        shape.tool.name === "path"
            ? Broadcast.finishCopiedPath(
                  newId,
                  shape.tool,
                  currentShape.pathDProps
              )
            : Broadcast.finishShape(newId, shape.tool);
    },
    mouseOver: function (ev) {
        Visualizer.clearSelection();
        var selection = getClosestElementByArea(ev);
        Visualizer.visualizeSelection(selection);
    },
};

var defaultText = "Start Typing...";
actions.text = {
    mouseDown: function (ev) {
        var id = BoardData.generateShapeId();
        var mouseXY = getMouseXY(ev);
        var socketId = BoardData.getSocketId();
        var currentTool = BoardData.getCurrentTool();
        currentTool.text = defaultText;

        EventHandler.createShape(
            id,
            socketId,
            currentTool,
            mouseXY.x,
            mouseXY.y
        );
        BoardData.setCurrentShape(id);
        Broadcast.newShape(id, socketId, currentTool, mouseXY.x, mouseXY.y);
        var currentShape = BoardData.getCurrentShape();

        document.onkeypress = function (ev) {
            BoardData.setEditorShape(currentShape);
            var editorShape = BoardData.getEditorShape();
            if (editorShape.attr("text") === defaultText) {
                editorShape.attr("text", "");
                currentTool.text = "";
            }

            if (ev.keyCode === 13) {
                // enter key to complete text insertion process
                editorShape.tool = currentTool;
                editorShape.tool.colors.fill = editorShape.trueColors.fill;
                editorShape.tool.colors.stroke = editorShape.trueColors.stroke;
                editorShape.attr({
                    fill: editorShape.trueColors.fill,
                    stroke: editorShape.trueColors.stroke,
                });
                EventHandler.finishShape(id, socketId, editorShape.tool);
                Broadcast.finishShape(id, editorShape.tool);
                editorShape = null;
                document.onkeydown = document.onkeypress = function () {};
            } else {
                // typing text
                editorShape.attr(
                    "text",
                    editorShape.attr("text") + String.fromCharCode(ev.keyCode)
                );
                currentTool.text = editorShape.attr("text");
                EventHandler.editShape(
                    id,
                    socketId,
                    currentTool,
                    editorShape.initX,
                    editorShape.initY
                );
                Broadcast.editShape(
                    id,
                    socketId,
                    currentTool,
                    editorShape.initX,
                    editorShape.initY
                );
            }
        };

        document.onkeydown = function (ev) {
            BoardData.setEditorShape(currentShape);
            var editorShape = BoardData.getEditorShape();
            if (ev.which === 8) {
                ev.preventDefault();
                if (editorShape) {
                    editorShape.attr(
                        "text",
                        editorShape
                            .attr("text")
                            .slice(0, editorShape.attr("text").length - 1)
                    );
                    currentTool.text = editorShape.attr("text");
                    EventHandler.editShape(
                        id,
                        socketId,
                        currentTool,
                        editorShape.initX,
                        editorShape.initY
                    );
                    Broadcast.editShape(
                        id,
                        socketId,
                        currentTool,
                        editorShape.initX,
                        editorShape.initY
                    );
                }
            }
        };
    },
    mouseHold: function (ev) {},
    mouseUp: function (ev) {},
    mouseOver: function (ev) {},
};

actions.shape = {
    mouseDown: function (ev) {
        var socketId = BoardData.getSocketId();
        var currentTool = BoardData.getCurrentTool();
        var mouseXY = getMouseXY(ev);
        var coords = Snap.snapToPoints(mouseXY.x, mouseXY.y);
        var id = BoardData.generateShapeId();

        if (currentTool.name !== "text" && currentTool.text) {
            delete currentTool.text;
        }

        EventHandler.createShape(
            id,
            socketId,
            currentTool,
            coords[0],
            coords[1]
        );
        BoardData.setCurrentShape(id);
        Broadcast.newShape(id, socketId, currentTool, coords[0], coords[1]);
    },
    mouseHold: function (ev) {
        var id = BoardData.getCurrentShapeId();
        var socketId = BoardData.getSocketId();
        var currentTool = BoardData.getCurrentTool();
        var mouseXY = getMouseXY(ev);
        var coords = Snap.snapToPoints(mouseXY.x, mouseXY.y);

        Broadcast.editShape(id, socketId, currentTool, coords[0], coords[1]);
        EventHandler.editShape(id, socketId, currentTool, coords[0], coords[1]);
    },
    mouseUp: function (ev) {
        var id = BoardData.getCurrentShapeId();
        var socketId = BoardData.getSocketId();
        var currentTool = BoardData.getCurrentTool();
        var shape = BoardData.getCurrentShape();

        var currentToolCopy = {};
        currentToolCopy.name = currentTool.name;
        currentToolCopy["stroke-width"] = currentTool["stroke-width"];
        currentToolCopy.colors = {};
        currentToolCopy.colors.fill = currentTool.colors.fill;
        currentToolCopy.colors.stroke = currentTool.colors.stroke;

        shape.tool = currentToolCopy;

        EventHandler.finishShape(id, socketId, currentToolCopy);
        BoardData.unsetCurrentShape();
        Visualizer.clearSnaps();

        if (currentTool.name === "path") {
            Broadcast.finishPath(id, currentTool, shape.pathDProps);
        } else {
            Broadcast.finishShape(id, currentTool);
        }
    },
    mouseOver: function (ev) {
        var mouseXY = getMouseXY(ev);
        Snap.snapToPoints(mouseXY.x, mouseXY.y);
    },
};

actions.magnify = {
    mouseDown: function (ev) {},
    mouseHold: function (ev) {
        var mouseXY = getMouseXY(ev);

        Zoom.zoom(ev, mouseXY);
    },
    mouseUp: function (ev) {
        Zoom.resetZoom();
    },
    mouseOver: function (ev) {},
};

actions.noTool = {
    mouseDown: function (ev) {},
    mouseHold: function (ev) {},
    mouseUp: function (ev) {},
    mouseOver: function (ev) {},
};

function getMouseXY(ev) {
    var canvas = BoardData.getCanvas();
    var point = canvas.createSVGPoint();
    point.x = ev.clientX;
    point.y = ev.clientY;
    var svgP = point.matrixTransform(canvas.getScreenCTM().inverse());
    return {
        x: svgP.x,
        y: svgP.y,
    };
}

var shapeTools = ["line", "circle", "path", "rectangle", "arrow"];
function parseToolName(toolName) {
    for (var i = 0; i < shapeTools.length; i++) {
        if (toolName === shapeTools[i]) {
            toolName = "shape";
        }
    }
    if (!toolName) {
        toolName = "noName";
    }
    return toolName;
}

function mouseDown(ev) {
    var toolName = parseToolName(BoardData.getCurrentTool().name);

    toggle(toolName);
    actions[toolName].mouseDown(ev);
}

function mouseMove(ev) {
    var toolName = parseToolName(BoardData.getCurrentTool().name);

    if (isToggled(toolName)) {
        actions[toolName].mouseHold(ev);
    } else {
        actions[toolName].mouseOver(ev);
    }
}

function mouseUp(ev) {
    var toolName = parseToolName(BoardData.getCurrentTool().name);

    if (isToggled(toolName)) {
        toggle(toolName);
        actions[toolName].mouseUp(ev);
    }
}

function keyPress(ev) {
    var toolName = parseToolName(BoardData.getCurrentTool().name);

    if (toolName !== "text") {
        // keycode value for lowercase m
        if (ev.keyCode === 109) {
            console.log("m has been typed");
        }
    }
}
// Begin mobile touch event handlers
function touchStart(ev) {
    mouseDown(ev.touches[0]);
}
function touchMove(ev) {
    mouseMove(ev.touches[0]);
}
function touchEnd(ev) {
    mouseUp(ev.touches[0]);
}

export default {
    touchstart: touchStart,
    touchmove: touchMove,
    touchend: touchEnd,
    mousedown: mouseDown,
    mousemove: mouseMove,
    mouseup: mouseUp,
    keypress: keyPress,
};
