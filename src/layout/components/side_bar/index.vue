<!--
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-24 10:35:47
 * @LastEditors: SCY
 * @LastEditTime: 2021-04-06 14:16:03
-->
<template>
  <div :class="{ 'has-logo': showLogo }" class="sideWrap">
    <!-- <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        background-color="#ffffff"
        text-color="#162B64"
        :active-text-color="menuActiveTextColor"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
    <div>
      <Hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Hamburger from "@/components/hamburger/index.vue";

import SidebarItem from "./SidebarItem.vue";
// import SidebarLogo from './SidebarLogo.vue'
// import variables from "@/styles/_variables.scss";
import { AppActionTypes } from "@/store/modules/app/action-types";

import { useStore } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Hamburger,
    SidebarItem,
    // SidebarLogo
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const sidebar = computed(() => {
      return store.state.app.sidebar;
    });
    const routes = computed(() => {
      return route.matched.map((item) => {
        return {
          path: item.path,
          name: item.name,
          meta: item.meta,
        };
      });
    });
    const showLogo = computed(() => {
      return store.state.settings.showSidebarLogo;
    });

    const menuActiveTextColor = computed(() => {
      console.log(store.state.settings.sidebarTextTheme);

      if (store.state.settings.sidebarTextTheme) {
        return "#57CAEB";
        // return store.state.settings.theme
      } else {
        // return variables.menuActiveText;
        return "#435EBE";
      }
    });

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
      }
      return path;
    });

    const isCollapse = computed(() => {
      return sidebar.value.opened;
    });
    const toggleSideBar = () => {
      store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false);
    };

    return {
      sidebar,
      routes,
      showLogo,
      menuActiveTextColor,
      // variables,
      activeMenu,
      isCollapse,
      toggleSideBar,
    };
  },
});
</script>

<style lang="scss">
.sidebar-container {
  padding-top: 52px;
  // reset element-ui css
  box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 25%), 1px 3px 4px 0px #eceef1;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
}

.el-menu {
  width: 100% !important;
  height: 100%;
  border: none;
}
.hamburger-container {
  position: absolute;
  bottom: 0;
  left: 0;
  // height: 100%;
  padding: 0 15px;
  line-height: 46px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
