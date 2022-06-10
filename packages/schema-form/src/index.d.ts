export interface Schema {
  key: string;
  label?: string;
  type: string;
  layoutProps?: { [propName: string]: unknown };
  formItemProps?: { [propName: string]: unknown };
  fieldProps?: { [propName: string]: unknown };
  customLabel?: boolean;
  customError?: boolean;
  formAreaTitleType?: string;
  height?: string;
  visible?: boolean;
  ref?: string;
  extendProps?: { [propName: string]: unknown };
}
