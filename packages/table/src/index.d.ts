export interface TableProps {
  isIndex?: boolean; // 是否显示序号
  indexTitle?: string; // 序号栏标题
  isMultiSelect?: boolean; // 是否多选
}
export interface Column {
  prop?: string;
  label?: string;
  width?: string | number;
  useTooltip?: boolean;
  tooltipProp?: string;
  visible?: boolean;
  isEle?: boolean;
  dpColumn?: any;
}
