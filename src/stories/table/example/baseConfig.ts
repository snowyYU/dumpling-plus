/*
 * @Author: jasper
 * @Date: 2022-05-27 16:05:45
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-07 18:45:28
 * @FilePath: /dumpling-plus/src/stories/table/example/baseConfig.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
/**
 * columns: 定义表格列配置
 * visible: 是否展示
 * prop:
 * label
 * useTooltip: 使用文字提示
 * isEle: 是否为节点
 */

export const baseColumn = [
  { prop: "name", label: "姓名" },
  { prop: "sex", label: "性别" },
  { prop: "age", label: "年龄" },
  {
    prop: "address",
    width: "100px",
    label: "地址",
    "show-overflow-tooltip": true,
  },
];
