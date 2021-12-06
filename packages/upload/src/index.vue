<template>
  <div>
    <el-upload
      ref="upload"
      action=""
      :http-request="submitFile"
      :on-success="handleFileSuccess"
      :on-error="handleFileError"
      :before-upload="handleFileBeforeUpload"
      :accept="accept"
      :file-list="selfFileList"
      :show-file-list="!showCustomFileList"
      :disabled="disabled"
    >
      <!-- with-credentials 如果需要带上cookie记得设为 true -->
      <el-button :disabled="disabled" size="small" type="primary"
        >点击上传</el-button
      >
    </el-upload>
    <div class="custom-file-list" v-if="showCustomFileList">
      <ul>
        <li class="file-li" v-for="(file, index) in selfFileList" :key="index">
          <div
            class="file-item"
            :class="{ 'file-item-error': file.status === 'fail' }"
            @mouseenter="fileIsFocus(file)"
            @mouseleave="fileIsBlur(file)"
          >
            <span class="file-name">{{ file.name || file.fileName }}</span>
            <div class="error-msg" v-if="file.status && file.msg">
              <span>{{ file.msg }}</span>
            </div>
            <!-- 成功的图标 -->
            <i
              v-if="file.status === 'success' || file.id"
              :class="{
                'is-hide': file.isFocus,
                'is-show': !file.isFocus,
              }"
              class="el-icon-success icon-bigData-chenggong"
            />
            <!-- 删除的图标 -->
            <i
              class="el-icon-delete icon-bigData-quxiao"
              v-if="!disabled && downloadingArray.length === 0"
              :class="{
                'is-focus': file.isFocus,
                'is-blur ': !file.isFocus,
              }"
              @click="
                removeFile({
                  key: file.key,
                  fileList: selfFileList,
                  file,
                  index,
                })
              "
            />
            <el-progress
              v-if="
                file.status !== 'fail' &&
                (file.percentage === 0 || file.percentage)
              "
              class="progress"
              :show-text="false"
              :stroke-width="2"
              :percentage="file.percentage"
              :color="'#19BE6B'"
            ></el-progress>
          </div>
          <span class="file-btn" v-if="file.fileUrl && showDownloadButton">
            <el-link
              class="download"
              type="primary"
              :underline="false"
              @click="download(file, index)"
              v-if="!downloadingArray.includes(index)"
            >
              下载</el-link
            >
            <span v-if="downloadingArray.includes(index)"
              >下载中...<i class="el-icon-loading"></i
            ></span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { this.uploadFile, downloadResponseById } from '@/api/common'
import { defineComponent } from "vue";
import cloneDeep from "lodash/cloneDeep";
import fileDownload from "js-file-download";

export default defineComponent({
  name: "DpUpload",
  components: {},
  props: {
    uploadFile: {
      type: Function,
      default: () => ({}),
    },
    downloadResponseById: {
      type: Function,
      default: () => ({}),
    },
    fileDataParams: {
      type: Object,
      default: () => ({}),
    },
    showCustomFileList: {
      type: Boolean,
      default: true,
    },
    bizType: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: ".doc,.docx,.pdf",
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    showDownloadButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      uploadErrorFiles: [] as Array<any>,
      downloadingArray: [] as Array<any>,
    };
  },
  computed: {
    selfFileList: {
      get() {
        return this.fileList as Array<any>;
      },
      set(value: any) {
        return value;
      },
    },
  },
  emits: ["uploadFileSucess", "updateFileList", "removeFile"],
  methods: {
    handleFileBeforeUpload(file: any) {
      file.status = "ready";
      file.percentage = 0;
    },
    submitFile(content: any) {
      const originFileList = cloneDeep(this.selfFileList);
      let formData = new FormData();
      formData.append("file", content.file);
      // formData.append("bizTypeEnum", this.bizType);
      Object.keys(this.fileDataParams).forEach((key) => {
        formData.append(key, this.fileDataParams[key]);
      });
      //
      // file类obj只能读，不能写所以复制一份使用,name不能枚举也要单独拿
      const copyFile = { ...content.file, name: content.file.name };
      // debugger;
      copyFile.percentage = 0;
      const onUploadProgress = (progressEvent: any) => {
        let percent = parseFloat(
          ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2)
        );
        // debugger;
        copyFile.percentage = percent;
        this.$emit("uploadFileSucess", copyFile);
      };
      copyFile.disabled = false;
      copyFile.isFocus = false;
      this.selfFileList.push(copyFile);
      this.uploadFile(formData, onUploadProgress)
        .then((res: any) => {
          if (res.code == "200") {
            content.onSuccess("文件上传成功！");
            copyFile.status = "success";
            this.$emit("uploadFileSucess", { ...copyFile, ...res.data });
            this.$emit("updateFileList", [
              ...originFileList,
              { ...copyFile, ...res.data },
            ]);
          } else {
            content.onError("文件上传失败, code:" + res.data.msg);
          }
        })
        .catch((err: any) => {
          content.onError("文件上传失败" + err);
        });
    },
    handleFileSuccess(res: any, file: any) {
      console.log("success");
      console.log("res");
      console.log("file");
      // debugger;
      // const idx = this.selfFileList.findIndex(item => item.uid === file.uid)
      // this.selfFileList.splice(idx, 1)
      // this.selfFileList.push(file)
    },
    handleFileError(err: any, file: any) {
      // 使用自定义文件列表需要用到
      // 传入报错信息
      file.msg = err;
    },
    removeFile(args: any) {
      const { index, fileList } = args;
      fileList.splice(index, 1)[0];
      // if (file.status === 'success') {
      //   }
      this.$emit("removeFile", fileList);
    },
    fileIsFocus(file: any) {
      if (this.disabled || this.downloadingArray.length > 0) {
        return;
      }
      file.isFocus = true;
    },
    fileIsBlur(file: any) {
      if (this.disabled) {
        return;
      }
      file.isFocus = false;
    },
    /**
     * 下载文件
     */
    download(data: any, index: any) {
      // this.downloadingArray.push(index);
      if (data.fileUrl) {
        console.log(data);

        const link = document.createElement("a");
        link.style.display = "none";
        link.target = "_blank";
        link.href = data.fileUrl;
        let fileName = data.dfsId || "";
        const idx = fileName.lastIndexOf("/");
        if (idx > -1) {
          fileName = fileName.slice(idx + 1);
        }
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(data.fileUrl);

        // this.downloadResponseById({ id: data.id }).then((res: any) => {
        //   this.downloadingArray.splice(
        //     this.downloadingArray.findIndex((item) => item === index),
        //     1
        //   );

        //   fileDownload(res, data.fileName);
        // });

        // window.open(downloadResponseById(data.id))

        // window.location.assign(downloadResponseById(data.id))
        // const link = document.createElement('a')

        // link.style.display = 'none'
        // link.target = '_blank'
        // link.href = data.fileUrl
        // link.download = data.fileName || ''
        // document.body.appendChild(link)
        // link.click()
        // document.body.removeChild(link) // 下载完成移除元素

        // var link = document.createElement('a')
        // link.href = downloadResponseById(data.id)
        // link.download = downloadResponseById(data.id).substr(
        //   downloadResponseById(data.id).lastIndexOf('/') + 1
        // )
        // link.click()

        // downloadPDF(data.fileUrl).then((response) => {
        //   const url = window.URL.createObjectURL(new Blob([response.data]))
        //   const link = document.createElement('a')
        //   // 返回的header Content-Disposition:attachment; filename=elmeast-report-2018-2.pdf
        //   const head = response.headers['content-disposition']
        //   let fname = 'report.pdf'
        //   if (head) {
        //     try {
        //       fname = head.split(';')[1].split('=')[1]
        //     } catch (err) {
        //       console.log('can not get pdf name')
        //     }
        //   }
        //   link.href = url
        //   link.setAttribute('download', fname)
        //   document.body.appendChild(link)
        //   link.click()
        // })
      } else {
        setTimeout(() => {
          this.$message({ type: "error", message: `${data.fileName}下载失败` });
        }, 500);
      }
    },
    resetFileList() {
      // this.uploadSucessFiles = []
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-file-list {
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    .file-li {
      display: flex;
      align-items: center;
    }
    .file-item {
      position: relative;
      width: 300px;
      margin-top: 8px;
      padding: 8px 0px 8px 8px;
      font-size: 14px;
      line-height: normal;
      background: #f4f7fb;
      border-radius: 4px;
      .file-name {
        display: inline-block;
        padding-right: 21px;
      }
    }
    .file-btn {
      margin-top: 8px;
      margin-left: 8px;
    }
    .file-item-error {
      background: rgba(229, 48, 47, 0.08);
    }
    .error-msg {
      margin-top: 2px;
      color: #e5302f;
    }
    .el-icon-success {
      position: absolute;
      top: 50%;
      right: 5px;
      color: #19be6b;
      transform: translateY(-50%);
      &.is-hide {
        display: none;
      }
      &.is-show {
        display: block;
      }
    }
    .el-icon-delete {
      position: absolute;
      top: 50%;
      right: 5px;
      display: none;
      transform: translateY(-50%);
      cursor: pointer;
      &.is-blur {
        display: none;
      }
      &.is-focus {
        display: block;
      }
    }
  }
  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
