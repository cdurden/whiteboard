import BoardData from "./board-data.js";
import ShapeBuilder from "./shape-builder.js";
import Snap from "./shape-editor.js";

var pathSmoother = function (pathElement) {
    var path = pathElement.attr("path");
    path =
        path.length > 1
            ? path
            : Raphael.parsePathString(pathElement.pathDProps);
    if (!path) return;
    var interval = 5;

    var newPath = path.reduce(function (
        newPathString,
        currentPoint,
        index,
        path
    ) {
        if (!(index % interval) || index === path.length - 1) {
            return (newPathString +=
                currentPoint[1] + "," + currentPoint[2] + " ");
        } else {
            return newPathString;
        }
    },
    path[0][0] + path[0][1] + "," + path[0][2] + " " + "R");

    if (path[path.length - 1] === "Z") {
        newPath += "Z";
    }
    pathElement.attr("path", newPath);
};

var grabPoint;
var origin;
function moveCircle(shape, x, y) {
    var deltaX = x - grabPoint.x;
    var deltaY = y - grabPoint.y;
    shape.attr({
        cx: origin.cx + deltaX,
        cy: origin.cy + deltaY,
    });
}

function moveRectangle(shape, x, y) {
    var deltaX = x - grabPoint.x;
    var deltaY = y - grabPoint.y;
    shape.attr({
        x: origin.x + deltaX,
        y: origin.y + deltaY,
    });
}

function movePath(shape, x, y) {
    var deltaX = x - grabPoint.x;
    var deltaY = y - grabPoint.y;

    var pathArr = shape.attr("path");
    for (var seg in pathArr) {
        pathArr[seg][1] = origin.path[seg][1] + deltaX;
        pathArr[seg][2] = origin.path[seg][2] + deltaY;
        if (pathArr[seg].length > 3) {
            pathArr[seg][3] = origin.path[seg][3] + deltaX;
            pathArr[seg][4] = origin.path[seg][4] + deltaY;
            pathArr[seg][5] = origin.path[seg][5] + deltaX;
            pathArr[seg][6] = origin.path[seg][6] + deltaY;
            shape.pathDProps = origin.pathDProps
                .split("L")
                .map(function (subpath, index) {
                    var xy = subpath.split(",");
                    var x;
                    if (index === 0) {
                        x = "M" + (+xy[0].slice(1) + deltaX);
                    } else {
                        x = +xy[0] + deltaX;
                    }
                    var y = +xy[1] + deltaY;
                    return x + "," + y;
                })
                .join("L");
        }
    }

    shape.attr("path", pathArr);
}

function moveText(shape, x, y) {
    var deltaX = x - grabPoint.x;
    var deltaY = y - grabPoint.y;
    shape.attr({
        x: origin.x + deltaX,
        y: origin.y + deltaY,
    });
}

function moveShape(id, socketId, x, y) {
    var shapeHandlers = {
        circle: moveCircle,
        path: movePath,
        line: movePath,
        rect: moveRectangle,
        text: moveText,
    };
    var shape = BoardData.getShapeById(id, socketId).toFront();
    if (!grabPoint) {
        grabPoint = { x: x, y: y };
        origin = shape.attr();
        origin.pathDProps = shape.pathDProps;
    }
    shapeHandlers[shape.type](shape, x, y);
}

function finishMovingShape(id, socketId) {
    grabPoint = null;
    origin = null;

    var shape = BoardData.getShapeById(id, socketId);
    Snap.createSnaps(shape);
}

export default {
    pathSmoother: pathSmoother,
    moveShape: moveShape,
    finishMovingShape: finishMovingShape,
};
