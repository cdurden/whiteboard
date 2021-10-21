<template>
    <div class="whiteboard-background" ref="background">
        <slot name="whiteboard-background"></slot>
    </div>
</template>
<script>
import BoardData from "../services/board-data.js";
import { ref, onMounted } from "vue";
export default {
    props: ["imageUrl"],
    setup(props) {
        const background = ref(null);
        var resizeSensor = null;
        onMounted(() => {
            var image = new Image();
            var w, h;
            image.src = props.imageUrl;
            background.value.style.backgroundImage = `url('${props.imageUrl}')`;

            function calculateViewBox(backgroundRect) {
                const canvas = BoardData.getCanvas();
                const canvasRect = canvas.getBoundingClientRect();
                return {
                    x: (-backgroundRect.left / backgroundRect.width) * w,
                    y: (-backgroundRect.top / backgroundRect.height) * h,
                    w: (canvasRect.width / backgroundRect.width) * w,
                    h: (canvasRect.height / backgroundRect.height) * h,
                };
            }
            var handleBackgroundResize = (function (backgroundElmt) {
                return function () {
                    const backgroundRect = backgroundElmt.getBoundingClientRect();
                    const viewBox = calculateViewBox(backgroundRect);
                    BoardData.getBoard().setViewBox(
                        viewBox.x,
                        viewBox.y,
                        viewBox.w,
                        viewBox.h
                    );
                };
            })(background.value);
            image.onload = function () {
                w = image.naturalWidth;
                h = image.naturalHeight;
                resizeSensor = new ResizeSensor(
                    background.value,
                    handleBackgroundResize
                );
            };
        });
        return {
            background,
        };
    },
};
</script>
