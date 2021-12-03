<template>
  <div
    class="form-title"
    :class="activeClass"
    :style="{ height: height + 'px', lineHeight: height + 'px' }"
  >
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormOtherMaterial",
  props: {
    type: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "40",
    },
  },
  computed: {
    activeClass() {
      let activeClassObj = {};
      switch (this.type) {
        case "newBlue":
          activeClassObj = { newBlue: true };
          break;

        default:
          break;
      }
      return activeClassObj;
    },
  },
});
</script>

<style lang="scss" scoped>
.form-title {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  color: #3a3a3d;
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  background-color: #f2f2f2;
}

.newBlue {
  padding-left: 12px;
  background-color: #fff;
  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 16px;
    margin-top: -8px;
    line-height: inherit;
    background-color: #409eff;
    content: "";
  }
}
</style>
