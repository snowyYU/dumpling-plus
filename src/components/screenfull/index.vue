<template>
  <div id="screenfull">
    <div v-if="isFullscreen" @click="click">
      <svg class="icon" aria-hidden="true" font-size="40px">
        <use xlink:href="#iconshiliangzhinengduixiang1" />
      </svg>
    </div>
    <div @click="click" v-else>
      <svg class="icon" aria-hidden="true" font-size="40px">
        <use xlink:href="#iconshiliangzhinengduixiang1" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import screenfull from "screenfull";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { ElMessage } from "element-plus";

const sf = screenfull;
export default defineComponent({
  setup() {
    const isFullscreen = ref(false);
    const click = () => {
      if (!sf.isEnabled) {
        ElMessage({
          message: "you browser can not work",
          type: "warning",
        });
        return false;
      }
      sf.toggle();
    };
    const change = () => {
      if (sf.isEnabled) {
        isFullscreen.value = sf.isFullscreen;
      }
    };
    onMounted(() => {
      if (sf.isEnabled) {
        sf.on("change", change);
      }
    });

    onBeforeUnmount(() => {
      if (sf.isEnabled) {
        sf.off("change", change);
      }
    });

    return {
      isFullscreen,
      click,
    };
  },
});
</script>
