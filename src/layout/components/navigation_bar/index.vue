<!--
 * @Description: 导航栏
 * @Author: ZY
 * @Date: 2020-12-17 15:52:19
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 19:16:50
-->
<template>
  <div class="navbar">
    <!-- <Hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    /> -->
    <!-- <BreadCrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    /> -->
    <div class="title">{{ title }}</div>
    <div class="right-menu">
      <SwitchStore></SwitchStore>
      <template v-if="device !== 'mobile'">
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
        <Screenfull class="right-menu-item hover-effect" />
        <!-- <el-tooltip
          :content="t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <SizeSelect class="right-menu-item hover-effect" />
        </el-tooltip> -->
        <!-- <LangSelect class="right-menu-item hover-effect" /> -->
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
            class="user-avatar"
          />
          <span class="user-nickname">{{ name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <!-- <a
              target="_blank"
              href="https://github.com/rcyj-FED/vue3-composition-admin"
            >
              <el-dropdown-item> github </el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://armour.github.io/vue-typescript-admin-docs/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click="logout">
              <span style="display: block"> 退出 </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
// import BreadCrumb from '@/components/bread-crumb/index.vue'
import Hamburger from "@/components/hamburger/index.vue";
import Screenfull from "@/components/screenfull/index.vue";
import SwitchStore from "./SwitchStore.vue";
// import SizeSelect from '@/components/size_select/index.vue'
import { defineComponent } from "@vue/runtime-core";
import { computed, ref } from "vue";
// import { computed, reactive, toRefs } from "vue";
import { useStore } from "@/store";
import { AppActionTypes } from "@/store/modules/app/action-types";
import { UserActionTypes } from "@/store/modules/user/action-types";
import { useRoute, useRouter } from "vue-router";
import settings from "../../../config/default/setting.config";

export default defineComponent({
  components: {
    // BreadCrumb,
    // Hamburger,
    Screenfull,
    // SizeSelect
    SwitchStore,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const sidebar = computed(() => {
      return store.state.app.sidebar;
    });
    const device = computed(() => {
      return store.state.app.device.toString();
    });
    const avatar = computed(() => {
      return store.state.user.avatar;
    });
    const name = computed(() => {
      return store.state.user.name;
    });
    const logout = () => {
      store.dispatch(UserActionTypes.ACTION_LOGIN_OUT);
      router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
        console.warn(err);
      });
    };
    // const state = reactive({
    //   toggleSideBar: () => {
    //     store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false);
    //   },
    // });

    const title = ref(settings.title);

    const toggleSideBar = () => {
      store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false);
    };

    return {
      title,
      sidebar,
      device,
      avatar,
      logout,
      name,
      // ...toRefs(state),
      toggleSideBar,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  z-index: 1001;
  height: 50px;
  overflow: hidden;
  background: #4a81fe;

  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    float: left;
    height: 100%;
    padding: 0 15px;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .title {
    float: left;
    height: 100%;
    padding-left: 32px;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      color: #fff;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 16px;
        margin-left: 16px;

        .user-avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
        .user-nickname {
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
