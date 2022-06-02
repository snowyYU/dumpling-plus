import DpLineEditTable from "~/line-edit-table";
import { ref } from "vue";
import { argTypes } from "./stories.config";
import { columns, data as initData, scopeType } from "./example/config";
// import { ValidateFieldsError} from "element-plus";
import docsPage from "./page.mdx";
import { Story } from "@storybook/vue3";

export default {
  title: "DpLineEditTable 编辑表格",
  component: DpLineEditTable,
  argTypes: argTypes,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
};

//
export const Base: Story = (args: object) => ({
  components: { DpLineEditTable },
  setup() {
    const tableData = ref([...initData]);
    // 数据修改回调事件，用来更新data
    const handleLineEditTableChange = (key: string, value: any, scope: any) => {
      (tableData.value[scope.$index] as any)[key] = value;
    };

    // 新增行
    const onPlusClick = () => {
      tableData.value.push({} as any);
    };
    // 删除行
    const onDeleteClick = (scope: scopeType) => {
      console.log(scope);
    };

    return {
      args,
      ...args,

      tableData,
      handleLineEditTableChange,
      onPlusClick,
      onDeleteClick,
    };
  },
  template: `
    <DpLineEditTable 
      v-bind="args"
      :columns="columns"
      :data="tableData" 
      @field-change="handleLineEditTableChange"
      @plus-click="onPlusClick"
      @delete-click="onDeleteClick"
    ></DpLineEditTable>
  `,
});
Base.args = {
  isIndex: true,
  isMultiSelect: true,
  showOperation: true,
  operationProps: {},
  columns: columns,
};
Base.storyName = "基础";

// 操作项
export const Operation: any = (args: object) => ({
  components: { DpLineEditTable },
  setup() {
    const columns: any[] = [
      {
        prop: "name",
        label: "姓名",
        type: "text",
      },
    ];
    const tableData: any[] = [
      {
        name: "张三",
      },
    ];
    const operationProps = {
      width: 340,
    };
    return {
      ...args,
      columns,
      tableData,
      operationProps,
    };
  },
  template: `
    <DpLineEditTable 
      :showPlusButton="false"
      :operationProps="operationProps"
      :columns="columns"
      :data="tableData">
      <template #operation>
          <el-button text type="primary">查看</el-button>
          <el-button text type="primary">详情</el-button>
          <el-button text type="primary" disabled >编辑</el-button>
          <el-button text type="danger">删除</el-button>
      </template>
    </DpLineEditTable>
  `,
});
Operation.args = {};
Operation.storyName = "操作项slot";

// 表单验证
export const Validate: any = (args: object) => ({
  components: { DpLineEditTable },
  setup() {
    const LineEditTable = ref();
    const columns: any[] = [
      {
        prop: "name",
        label: "姓名",
        type: "input",
        rules: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    ];
    const tableData = ref([
      {
        name: "",
      },
    ]);
    const onCheck = () => {
      LineEditTable.value?.validate((isValid: boolean, invalidFields?: any) => {
        console.log(isValid, invalidFields);
      });
    };
    const handleLineEditTableChange = (key: string, value: any, scope: any) => {
      (tableData.value[scope.$index] as any)[key] = value;
    };
    return {
      ...args,
      LineEditTable,
      columns,
      tableData,
      onCheck,
      handleLineEditTableChange,
    };
  },
  template: `
    <DpLineEditTable 
      ref="LineEditTable"
      :columns="columns"
      :data="tableData"
      @field-change="handleLineEditTableChange">
      <template #operation>
        <el-button @click="onCheck">验证</el-button>
      </template>
    </DpLineEditTable>
  `,
});
Validate.args = {};
Validate.storyName = "表单验证";

// 下拉框select options
export const SelectOptions: any = (args: object) => ({
  components: { DpLineEditTable },
  setup() {
    const columns = [
      {
        prop: "seelct",
        label: "常规透传options",
        type: "select",
        fieldProps: {
          options: [
            {
              label: "张三",
              value: "zjl",
            },
            {
              label: "李小龙",
              value: "lxl",
            },
          ],
        },
      },
      {
        prop: "custom_seelct",
        label: "自定义options",
        type: "select",
      },
      {
        prop: "custom_seelct-customOptionsName",
        label: "自定义options",
        type: "select",
        customOptionsName: "my-options",
      },
    ];
    const tableData = ref([
      {
        seelct: "lxl",

        // 自定义
        custom_seelct: "lxl",
        custom_seelct_options: [
          {
            label: "张三",
            value: "zjl",
          },
          {
            label: "李小龙",
            value: "lxl",
          },
        ],
        // 自定义
        "custom_seelct-customOptionsName": "lxl",
        "my-options": [
          {
            label: "张三",
            value: "zjl",
          },
          {
            label: "李小龙",
            value: "lxl",
          },
        ],
      },
    ]);
    return {
      ...args,
      columns,
      tableData,
    };
  },
  template: `
    <DpLineEditTable 
      :columns="columns"
      :showPlusButton="false"
      :data="tableData">
    </DpLineEditTable>
  `,
});
SelectOptions.storyName = "下拉框select options";

// 校验规则
export const Rules: Story = (args: object) => ({
  components: { DpLineEditTable },
  setup() {
    const LineEditTable = ref();
    const columns = [
      {
        prop: "rules",
        label: "正常rules",
        type: "input",
        rules: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      {
        prop: "input",
        label: "自定义rules",
        type: "input",
        customRulesName: "input_length_rules",
      },
    ];
    const tableData = ref([
      {
        input: "==",
        rules: "",
        // 自定义校验规则列表
        input_length_rules: [
          {
            validator: (rule: any, value: any, callback: any) => {
              return value?.length >= 6
                ? callback()
                : callback(new Error("字符串长度必须>=6"));
            },
          },
        ],
      },
    ]);
    const onCheck = () => {
      LineEditTable.value.validate((valid: any) => {
        console.log(valid);
      });
    };
    const handleLineEditTableChange = (key: string, value: any, scope: any) => {
      (tableData.value[scope.$index] as any)[key] = value;
    };
    return {
      ...args,
      LineEditTable,
      columns,
      tableData,

      onCheck,
      handleLineEditTableChange,
    };
  },
  template: `
    <DpLineEditTable 
      :columns="columns"
      :showPlusButton="false"
      :data="tableData"
      @field-change="handleLineEditTableChange"
      ref="LineEditTable">
      <template #operation>
        <el-button @click="onCheck">验证</el-button>
      </template>
    </DpLineEditTable>
  `,
});
Rules.storyName = "校验规则";
