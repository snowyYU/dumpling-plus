# 上传组件使用说明

库中组件部分需要在注册时传入上传，下载的请求方法，示例如下

```javascript
app.use(DumplingPlus, { downloadFileById, uploadFile });
```

传入的方法示例如下(使用了 axios 库)

```javascript
/**
 * 根据id下载文档
 * @param params
 * @returns
 */
export function downloadFileById(params: any) {
  return request.request({
    url: baseUrl + "/global/uploadFile" + params.id,
    method: "get",
    responseType: "blob",
    params,
  });
}

/**
 * 文件上传
 * @param data
 * @param onUploadProgress
 * @returns
 */
export function uploadFile(data: any, onUploadProgress: any) {
  return request.request({
    url: baseUrl + "/global/uploadFile",
    method: "post",
    data,
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
```

由于上传组件经常在 SchemaForm 组建中使用，所以先讲下 SchemaForm 组建中 type 为 upload 时的配置，说明如下

```javascript
{
    key: "photos",  // 绑定值类型为 File[]
    type: "upload",
    label: "图片",
    fieldProps: {  // 这部分参数会被直接解构到 dp-upload 组件上
      limit: 1,
      accept: "image/*",
      // disabled: false,
      showDownloadButton: false,
    },
  },
```

SchemaForm 组件上 3 个钩子

this.$emit("upload-update", key, fileList);

this.$emit("remove-success", key, fileList);

this.$emit("file-success", key, file);

> 注意此时拿到的是单文件

## 属性

> 直接作用于 dp-upload 组建上的属性会被透传给组件内部的 el-upload 组建上，所以 [el-upload](https://element-plus.gitee.io/zh-CN/component/upload.html) 本身的属性方法等不在此列出

| 属性               |                       说明                       |   类型   |   可选值   |          默认值 |
| ------------------ | :----------------------------------------------: | :------: | :--------: | --------------: |
| disabled           |        组件禁用状态，开启时会同时禁用下载        | boolean  | true/false |           false |
| accept             |                接收的上传文件类型                |  string  |     -      | .doc,.docx,.pdf |
| showCustomFileList |             控制文件上传列表显示隐藏             | boolean  | true/false |            true |
| showDownloadButton |               控制下载按钮显示隐藏               | boolean  | true/false |            true |
| limit              |                 限制文件上传数量                 |  number  |     -      |               - |
| uploadFile         |          用以替换全局 上传文件默认方法           | function |     -      |               - |
| downloadFileById   |      用以替换全局 根据文件 ID 下载默认方法       | function |     -      |               - |
| fileDataParams     | 会向每次上传的 FormData 中添加此对象解构后的属性 |  object  |     -      |               - |

## exposes 暴露出来的钩子

## 上传前的 FileItemBeforeUpload 说明

```typescript
interface FileItemBeforeUpload {
  name: string; //UploadRequestOptions.file.name   UploadRequestOptions 类型为 element-plus 中的返回类型
  status: string; // ready
  percentage: number;
  disable: boolean;
  isFocus: boolean;
  // ...UploadRequestOptions.file 解构在这里
}
```

## 上传后的 FileItemAfterUpload 说明

```typescript
interface FileItemBeforeUpload {
  name: string;
  status: string; // success | fail
  percentage: number;
  // ...FileItemBeforeUpload
  // ...上传文件接口的响应也会被解构在此
}
```

## 一些说明

- 下载选项显示需要 FileItemBeforeUpload 中存在有效 `fileUrl` 字段
- 成功的图标显示需要 FileItemBeforeUpload 中 `status` 字段为 success 或者存在有效的 `id` 字段
- 错误信息的显示需要 FileItemBeforeUpload 中 存在有效的 `msg` 字段
