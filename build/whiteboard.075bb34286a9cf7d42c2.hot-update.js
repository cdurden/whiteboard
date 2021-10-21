"use strict";
self["webpackHotUpdatewhiteboard"]("whiteboard",{

/***/ "./client/main.js":
/*!************************!*\
  !*** ./client/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRoot": () => (/* binding */ getRoot),
/* harmony export */   "injectAppElements": () => (/* binding */ injectAppElements)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _Whiteboard_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Whiteboard.vue */ "./client/Whiteboard.vue");
/* harmony import */ var _services_auth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/auth.js */ "./client/services/auth.js");




async function init(root) {
  var roomId;
  const url = new URL(window.location.href);

  if (url.pathname === "/") {
    roomId = _services_auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].generateRandomId(5);
    console.log(roomId);
    window.location.pathname = "/" + roomId;
  } else {
    roomId = window.location.pathname.slice(1);
  }

  const props = {
    roomId
  };
  const app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(Aleksi, props);
  return app;
}

window.addEventListener("load", event => {
  const root = getRoot();
  init(root).then(app => {
    injectAppElements(root, app);
  });
});
/*jslint browser*/

function getRoot() {
  const root = document.getElementById("whiteboard-app") || document.createElement("div");
  root.id = "whiteboard-app";
  document.body.appendChild(root);
  return root;
}

function injectAppElements(root, app) {
  // Root element
  app.mount(root);
}



/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("17e4131cceebba9692bc")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hpdGVib2FyZC4wNzViYjM0Mjg2YTljZjdkNDJjMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLGVBQWVHLElBQWYsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQ3RCLE1BQUlDLE1BQUo7QUFDQSxRQUFNQyxHQUFHLEdBQUcsSUFBSUMsR0FBSixDQUFRQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQXhCLENBQVo7O0FBQ0EsTUFBSUosR0FBRyxDQUFDSyxRQUFKLEtBQWlCLEdBQXJCLEVBQTBCO0FBQ3RCTixJQUFBQSxNQUFNLEdBQUdILDBFQUFBLENBQXNCLENBQXRCLENBQVQ7QUFDQVcsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlULE1BQVo7QUFDQUcsSUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCRSxRQUFoQixHQUEyQixNQUFNTixNQUFqQztBQUNILEdBSkQsTUFJTztBQUNIQSxJQUFBQSxNQUFNLEdBQUdHLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkUsUUFBaEIsQ0FBeUJJLEtBQXpCLENBQStCLENBQS9CLENBQVQ7QUFDSDs7QUFDRCxRQUFNQyxLQUFLLEdBQUc7QUFDVlgsSUFBQUE7QUFEVSxHQUFkO0FBR0EsUUFBTVksR0FBRyxHQUFHakIsOENBQVMsQ0FBQ2tCLE1BQUQsRUFBU0YsS0FBVCxDQUFyQjtBQUNBLFNBQU9DLEdBQVA7QUFDSDs7QUFDRFQsTUFBTSxDQUFDVyxnQkFBUCxDQUF3QixNQUF4QixFQUFpQ0MsS0FBRCxJQUFXO0FBQ3ZDLFFBQU1oQixJQUFJLEdBQUdpQixPQUFPLEVBQXBCO0FBQ0FsQixFQUFBQSxJQUFJLENBQUNDLElBQUQsQ0FBSixDQUFXa0IsSUFBWCxDQUFpQkwsR0FBRCxJQUFTO0FBQ3JCTSxJQUFBQSxpQkFBaUIsQ0FBQ25CLElBQUQsRUFBT2EsR0FBUCxDQUFqQjtBQUNILEdBRkQ7QUFHSCxDQUxEO0FBTUE7O0FBQ0EsU0FBU0ksT0FBVCxHQUFtQjtBQUNmLFFBQU1qQixJQUFJLEdBQ05vQixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZ0JBQXhCLEtBQ0FELFFBQVEsQ0FBQ0UsYUFBVCxDQUF1QixLQUF2QixDQUZKO0FBR0F0QixFQUFBQSxJQUFJLENBQUN1QixFQUFMLEdBQVUsZ0JBQVY7QUFDQUgsRUFBQUEsUUFBUSxDQUFDSSxJQUFULENBQWNDLFdBQWQsQ0FBMEJ6QixJQUExQjtBQUNBLFNBQU9BLElBQVA7QUFDSDs7QUFDRCxTQUFTbUIsaUJBQVQsQ0FBMkJuQixJQUEzQixFQUFpQ2EsR0FBakMsRUFBc0M7QUFDbEM7QUFDQUEsRUFBQUEsR0FBRyxDQUFDYSxLQUFKLENBQVUxQixJQUFWO0FBQ0g7Ozs7Ozs7Ozs7VUN0Q0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aGl0ZWJvYXJkLy4vY2xpZW50L21haW4uanMiLCJ3ZWJwYWNrOi8vd2hpdGVib2FyZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFdoaXRlYm9hcmQgZnJvbSBcIi4vV2hpdGVib2FyZC52dWVcIjtcbmltcG9ydCBBdXRoIGZyb20gXCIuL3NlcnZpY2VzL2F1dGguanNcIjtcblxuYXN5bmMgZnVuY3Rpb24gaW5pdChyb290KSB7XG4gICAgdmFyIHJvb21JZDtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBpZiAodXJsLnBhdGhuYW1lID09PSBcIi9cIikge1xuICAgICAgICByb29tSWQgPSBBdXRoLmdlbmVyYXRlUmFuZG9tSWQoNSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJvb21JZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9IFwiL1wiICsgcm9vbUlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb21JZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKTtcbiAgICB9XG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgIHJvb21JZCxcbiAgICB9O1xuICAgIGNvbnN0IGFwcCA9IGNyZWF0ZUFwcChBbGVrc2ksIHByb3BzKTtcbiAgICByZXR1cm4gYXBwO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBnZXRSb290KCk7XG4gICAgaW5pdChyb290KS50aGVuKChhcHApID0+IHtcbiAgICAgICAgaW5qZWN0QXBwRWxlbWVudHMocm9vdCwgYXBwKTtcbiAgICB9KTtcbn0pO1xuLypqc2xpbnQgYnJvd3NlciovXG5mdW5jdGlvbiBnZXRSb290KCkge1xuICAgIGNvbnN0IHJvb3QgPVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndoaXRlYm9hcmQtYXBwXCIpIHx8XG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm9vdC5pZCA9IFwid2hpdGVib2FyZC1hcHBcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3QpO1xuICAgIHJldHVybiByb290O1xufVxuZnVuY3Rpb24gaW5qZWN0QXBwRWxlbWVudHMocm9vdCwgYXBwKSB7XG4gICAgLy8gUm9vdCBlbGVtZW50XG4gICAgYXBwLm1vdW50KHJvb3QpO1xufVxuXG5leHBvcnQgeyBnZXRSb290LCBpbmplY3RBcHBFbGVtZW50cyB9O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMTdlNDEzMWNjZWViYmE5NjkyYmNcIikiXSwibmFtZXMiOlsiY3JlYXRlQXBwIiwiV2hpdGVib2FyZCIsIkF1dGgiLCJpbml0Iiwicm9vdCIsInJvb21JZCIsInVybCIsIlVSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInBhdGhuYW1lIiwiZ2VuZXJhdGVSYW5kb21JZCIsImNvbnNvbGUiLCJsb2ciLCJzbGljZSIsInByb3BzIiwiYXBwIiwiQWxla3NpIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZ2V0Um9vdCIsInRoZW4iLCJpbmplY3RBcHBFbGVtZW50cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtb3VudCJdLCJzb3VyY2VSb290IjoiIn0=