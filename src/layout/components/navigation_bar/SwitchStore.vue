<template>
  <el-dropdown :disabled="submitting" @command="handleCommand">
    <div class="el-dropdown-link">
      <span :class="{ 'text-placeholder': !currentStore }">
        {{ currentStore ? storeListMap[currentStore] : "请选择仓库" }}
      </span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :command="item.id"
          v-for="item in storeList"
          :key="item.id"
        >
          {{ item.warehouseName }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
// import { defineComponent, ref, computed, onMounted } from "vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { UserActionTypes } from "@/store/modules/user/action-types";
// import {
//   getWarehouseDropDown,
//   warehousePeriodsList,
// } from "@/api/stock/GlobalController";
// import { queryCurPeriod } from "@/api/stock/StandingBookController";

export default defineComponent({
  name: "SwitchStore",
  setup() {
    const store = useStore();
    const submitting = ref(false);
    // const storeList = ref<any>([]);
    // const currentStore = ref("");

    const currentWarehouseInfo = computed(
      () => store.state.user.currentWarehouseInfo
    );
    const currentStore = computed(() => {
      return currentWarehouseInfo.value.warehouseId || "";
    });
    const storeList = computed(() => store.state.user.warehouseList);
    const storeListMap = computed(() => {
      const map: any = {};
      storeList.value.forEach((item: any) => {
        map[item.id] = item.warehouseName;
      });
      return map;
    });

    // const getCurPeriod = async () => {
    //   try {
    //     const res = await queryCurPeriod();
    //     const { warehouseId = "" } = res.data || {};
    //     currentStore.value = warehouseId;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    // const queryWarehouseDropDown = async () => {
    //   try {
    //     const res = await getWarehouseDropDown();
    //     storeList.value = res.data as any;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    // const queryWarehousePeriodsList = async () => {
    //   try {
    //     const res = await warehousePeriodsList();
    //     // storeList.value = res.data as any;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    const handleCommand = async (command: string) => {
      if (currentStore.value === command) {
        return;
      }

      try {
        submitting.value = true;
        ElMessage({
          type: "success",
          message: "切换仓库成功，即将刷新页面...",
          duration: 1500,
          onClose() {
            window.location.reload();
          },
        });

        // getCurPeriod();
        // queryWarehousePeriodsList();
        // store.dispatch(UserActionTypes.ACTION_GET_CURRENT_WAREHOUSE_INFO);
        // store.dispatch(UserActionTypes.ACTION_GET_WAREHOUSE_PERIOD_LIST);
        submitting.value = false;
      } catch (e) {
        submitting.value = false;
      }
    };

    // const updateDataSource = () => {
    //   getCurPeriod();
    //   queryWarehousePeriodsList();
    //   queryWarehouseDropDown();
    // };

    // onMounted(() => {
    //   updateDataSource();
    // });

    return {
      submitting,
      currentStore,
      storeList,
      storeListMap,
      handleCommand,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 0 16px;
  color: #ffffff;
  cursor: pointer;
}

.text-placeholder {
  color: #cccccc;
}
</style>
