<!--
 * @Description: 折叠边栏按钮
 * @Author: ZY
 * @Date: 2020-12-23 16:25:41
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-23 17:55:52
-->

<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <!-- <svg >
      <use xlink:href="#iconhamburger" />
    </svg> -->
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      class="hamburger icon"
      aria-hidden="true"
      font-size="20px"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-click"],
  setup(_, context) {
    const toggleClick = () => {
      context.emit("toggle-click");
    };
    return {
      toggleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
