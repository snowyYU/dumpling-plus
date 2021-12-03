export interface Schema {
  key: string;
  label?: string;
  type: string;
  layoutProps?: { [propName: string]: unknown };
  formItemProps?: { [propName: string]: unknown };
  fieldProps?: { [propName: string]: unknown };
  customLabel?: boolean;
  customError?: boolean;
  visible?: boolean;
  ref?: string;
}
