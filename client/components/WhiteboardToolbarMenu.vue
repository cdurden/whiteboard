<template>
    <template v-for="itemName of itemNames">
        <div
            class="icon"
            :class="['icon-' + itemName, itemClass]"
            :style="itemStyle"
            @click="triggerAction(itemName)"
        >
            <div
                v-if="['fill', 'stroke'].includes(menuName)"
                class="color-palette"
                :style="{ 'background-color': hexToRGBA(itemName) }"
            ></div>
            <p class="menu-text valign-text">
                {{ displayNames.get(itemName) }}
            </p>
        </div>
        <div
            v-if="menu instanceof Map"
            class="menu"
            :class="submenuClass"
            v-show="active && showState.get(itemName)"
        >
            <whiteboard-toolbar-menu
                :level="level + 1"
                :menu="menu.get(itemName)"
                :menuName="itemName"
                :showState="showState"
                :actions="actions"
                :active="active"
                @triggerAction="triggerAction"
                @deactivate-menu="deactivateMenu"
                @activate-menu="activateMenu"
                @hide-parents="
                    hide(menu);
                    hideParents();
                "
            ></whiteboard-toolbar-menu>
        </div>
    </template>
</template>
<script>
import { ref, onBeforeUpdate } from "vue";
var numbers = new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"],
]);
function capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function menuItemNames(menu) {
    if (menu instanceof Array) {
        return menu;
    } else if (menu instanceof Map) {
        return Array.from(menu.keys());
    }
}
export default {
    name: "whiteboard-toolbar-menu",
    props: ["active", "showState", "level", "menuName", "menu", "actions"],
    emits: [
        "triggerAction",
        "showParents",
        "hideParents",
        "activateMenu",
        "deactivateMenu",
    ],
    computed: {
        displayNames() {
            return new Map(
                Array.from(this.menu.keys()).map(function (name) {
                    return [name, capitalize(name)];
                })
            );
        },
        itemNames() {
            return menuItemNames(this.menu);
        },
        itemStyle() {
            return `height: ${100 / this.itemNames.length}%;`;
        },
        submenuClass() {
            return `level-${numbers.get(this.level + 1)}`;
        },
        itemClass() {
            return `level-${numbers.get(this.level)}-items`;
        },
    },
    methods: {
        triggerAction(menuItemName) {
            var active = this.active;
            this.$emit("triggerAction", menuItemName);
            // Handle menu activation and deactivation
            if (this.level === 1 && !this.active) {
                // The user has clicked a menu item. Activate the menu.
                this.activateMenu();
                active = true;
            } else if (
                this.level === 1 &&
                this.active &&
                this.itemNames.includes(menuItemName) &&
                this.showState.get(menuItemName)
            ) {
                // The user has clicked on a level-one item
                // and the submenu is already being shown.
                // Deactivate the submenu.
                this.deactivateMenu();
            }
            // Handle bound actions
            if (this.actions.has(this.menuName)) {
                // This submenu has a bound action. Call the action function,
                // passing the name of the clicked item.
                this.actions.get(this.menuName)(menuItemName);
                this.hideParents();
            }
            // Handle opening of submenus
            if (this.menu instanceof Map && this.menu.has(menuItemName)) {
                // The user has clicked on an submenu opener in *this* menu.
                if (this.showState.get(menuItemName)) {
                    // The submenu is already shown. Hide it.
                    this.hideSubmenus(this.menu);
                } else {
                    // The submenu is not already shown. Show it.
                    this.hideSubmenus(this.menu);
                    this.showState.set(menuItemName, true);
                }
            }
        },
        hide(menu) {
            var itemNames = menuItemNames(menu);
            itemNames.forEach((itemName) => {
                this.showState.set(itemName, false);
            });
        },
        hideSubmenus(menu) {
            if (menu instanceof Map) {
                this.hide(menu);
                Array.from(menu.values()).forEach((submenu) => {
                    this.hideSubmenus(submenu);
                });
            }
        },
        showParents() {
            this.$emit("showParents");
        },
        hideParents() {
            this.$emit("hideParents");
        },
        activateMenu() {
            this.$emit("activateMenu");
        },
        deactivateMenu() {
            this.$emit("deactivateMenu");
        },
        hexToRGBA(hex, opacity = 90) {
            var hex = hex.replace("#", "");
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);

            return "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
        },
    },
};
</script>
