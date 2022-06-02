export const argTypes = {
  // props
  limit: {
    type: {
      summary: "number",
    },
    table: {
      category: "props",
    },
    description: "允许上传文件的最大数量",
  },
  uploadFile: {
    description:
      "文件上传函数，参数是(formData文件数据，onUploadProgress进度函数)，应返回一个Promise，",
  },
  fileDataParams: {
    description: "uploadFile函数所需的额外formData数据对象，默认有file",
  },
  showCustomFileList: {
    description: "是否展示文件列表",
  },
  disabled: {
    description: "	是否禁用上传",
  },
  accept: {
    description: "接受上传的文件类型",
  },
  fileList: {
    description: "默认上传文件",
  },
  showDownloadButton: {
    description: "当文件上传完成后，是否展示下载按钮",
  },

  // events
  uploadFileSucess: {
    description: "当文件上传成功或者上传过程onUploadProgress进度函数调用触发",
  },
  updateFileList: {
    description: "当文件上传成功更新文件列表时",
  },
  removeFile: {
    description: "当点击文件列表删除图标时触发",
  },
  "file-exceed": {
    description: "当超出限制时，执行的钩子函数",
  },

  // slots
};
