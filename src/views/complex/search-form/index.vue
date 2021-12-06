<template>
  <div>
    <dp-search-form
      ref="searchFormRef"
      v-model:model="searchFormData"
      :schema="searchFormSchema"
      :firstLineMaxItem="4"
      @search="handleSearch"
      @reset="handleReset"
      @hide-over-flow="hideOverFlow"
    ></dp-search-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import {
  searchFormSchema as initSearchFormSchema,
  searchFormData as initSearchFormData,
} from "./config";
import DpSearchForm from "~/search-form/src/index.vue";

export default defineComponent({
  name: "search-form",
  setup() {
    const searchFormSchema = reactive(initSearchFormSchema);
    const searchFormRef = ref<InstanceType<typeof DpSearchForm>>();

    const searchFormSchemaMap = computed(() => {
      const schemaMap: { [propName: string]: number } = {};
      searchFormSchema.forEach((item, index) => {
        schemaMap[item.key] = index;
      });
      return schemaMap;
    });

    const searchFormData = ref(initSearchFormData);
    /**
     * 搜索
     */
    const handleSearch = () => {
      console.log("search", searchFormData.value);
    };

    /**
     * 重置
     */
    const handleReset = () => {
      searchFormRef.value?.resetFields();
    };
    const hideOverFlow = (toggle: boolean) => {
      console.log(toggle);
    };
    return {
      searchFormSchema,
      searchFormSchemaMap,
      searchFormData,
      handleSearch,
      handleReset,
      hideOverFlow,
      searchFormRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>
