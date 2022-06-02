import DpUpload from "~/upload";
import { ref } from "vue";
import { Story } from "@storybook/vue3";
import { argTypes } from "./stories.config";

export default {
  title: "DpUpload 上传",
  component: DpUpload,
  argTypes: argTypes,
};

//
export const Base: any = (args: object) => ({
  components: { DpUpload },
  setup() {
    const fileList = ref([]);
    //
    const fileDataParams = {
      id: "===========",
    };
    // 上传函数
    const onUploadFile = (formData: any, onUploadProgress: void) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {},
            code: 200,
          });
        }, 1000);
      });
    };
    //
    const onUpdateFileList = (data: any) => {
      console.log("onUpdateFileList", data);
    };
    // 上传成功函数
    const onUploadFileSucess = (data: any) => {
      console.log("onUploadFileSucess", data);
    };

    return {
      ...args,
      fileList,
      fileDataParams,
      onUploadFile,
      onUpdateFileList,
      onUploadFileSucess,
    };
  },
  template: `
    <dp-upload
      :fileList="fileList"
      :fileDataParams="fileDataParams" 
      :uploadFile="onUploadFile" 
      @uploadFileSucess="onUploadFileSucess"
      @updateFileList="onUpdateFileList"
      :showCustomFileList="showCustomFileList"
    >
    </dp-upload>
  `,
});
Base.args = {
  showCustomFileList: true,
};
Base.storyName = "基础";
Base.parameters = {
  docs: {
    description: {
      story: "==",
    },
  },
};

// accept文件类型
export const Accept: Story = (args: any) => ({
  components: { DpUpload },
  setup() {
    return {
      ...args,
    };
  },
  template: `
    限定图片：<dp-upload :accept="accept_image"></dp-upload>
    限定音频：<dp-upload :accept="accept_audio"></dp-upload>
    限定视频：<dp-upload :accept="accept_video"></dp-upload>
  `,
});
Accept.args = {
  accept_image: "image/*",
  accept_audio: "audio/*",
  accept_video: "video/*",
};
Accept.storyName = "限制文件类型";
Accept.parameters = {
  docs: {
    description: {
      story: "可限制上传按钮所能选择的文件类型，默认类型是：.doc,.docx,.pdf",
    },
  },
};

// 限制文件最大数
export const MaxCount: Story = (args: any) => ({
  components: { DpUpload },
  setup() {
    return {
      ...args,
    };
  },
  template: `
    最多可选择：<dp-upload :accept="accept_image"></dp-upload>
  `,
});
