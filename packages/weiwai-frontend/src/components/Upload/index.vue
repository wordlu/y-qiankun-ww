<template>
  <div class="images-list">
    <el-upload
      class="upload-demo"
      action="xxxxxxxxxx"
      :before-upload="handleBeforeUpload"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleUploadError"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :multiple="fileLimit > 1"
      :limit="fileLimit"
      :list-type="listType"
      :auto-upload="false"
    >
      <i v-if="listType === 'picture-card'" class="el-icon-plus"></i>
      <el-button v-else size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<!-- <script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
type dataItem = { path: string; name: string; [key: string]: any };

@Component // 声明为一个组件
export default class Upload extends Vue {
  // 值
  @Prop() private value!: any;
  // 大小限制(MB)
  @Prop({
    default: 80,
    required: true,
  })
  fileSize!: number;
  // 文件类型, 例如["doc", "xls", "ppt", "txt", "pdf"]
  @Prop({
    default: () => [],
    required: true,
  })
  fileType!: Array<string>;
  // 文件列表类型 text/picture/picture-card
  @Prop({
    default: "picture-card",
    required: true,
  })
  listType!: string;
  // 最大允许上传个数
  @Prop({
    default: 99,
    required: true,
  })
  fileLimit!: number;

  private fileList = [];
  public tempFileList = [];

  @Watch("child")
  valueChange(newVal: any, oldVal: any) {
    this.tempFileList = newVal;
  }

  public get fileTypeName() {
    let typeName = "";
    this.fileType.forEach((item) => {
      typeName += `${item}，`;
    });
    return typeName;
  }
  public get fileAccept() {
    let fileAccept = "";
    this.fileType.forEach((element) => {
      fileAccept += `.${element},`;
    });
    return fileAccept;
  }
  private created() {
    this.fileList = this.value && JSON.parse(JSON.stringify(this.value));
  }
  // 上传前校检格式和大小
  private handleBeforeUpload(file: any) {
    // 校检文件类型
    if (this.fileType && file) {
      let fileExtension = "";
      if (file.name.lastIndexOf(".") > -1) {
        fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
      }
      const isTypeOk = this.fileType.some((type) => {
        if (file.type.indexOf(type) > -1) return true;
        if (fileExtension && fileExtension.indexOf(type) > -1) return true;
        return false;
      });
      if (file) {
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
    }
    // 校检文件大小
    if (this.fileSize && file) {
      const isLt = file.size / 1024 / 1024 < this.fileSize;
      if (!isLt) {
        this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
        return false;
      }
    }
    return true;
  }
  // 文件个数超出
  private handleExceed() {
    this.$message.error(`超出上传文件个数,请删除以后再上传！`);
  }

  private handleUploadError(err: any) {
    this.$message.error("上传失败, 请重试");
  }

  // 文件上传成功的钩子
  private handleSuccess(res: any, file: any, fileList: any) {
    this.$message.success("上传成功");
    this.changeFileList(fileList);
  }
  // 文件列表移除文件时的钩子
  private handleRemove(file: any, fileList: any) {
    this.changeFileList(fileList);
  }
  // 文件列表改变的时候，更新组件的v-model的文的数据
  private changeFileList(fileList: any[]) {
    const tempFileList = fileList.map((item) => {
      let tempItem = {
        name: item.name,
        url: item.response ? item.response.url : item.url,
      };
      return tempItem;
    });
    this.$emit("input", tempFileList);
  }
}
</script> -->

<script>
export default {
  name: "Upload",
  props: {
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 80,
    },
    // 文件类型, 例如["doc", "xls", "ppt", "txt", "pdf"]
    fileType: {
      type: Array,
      default: () => [],
    },
    // 文件列表类型 text/picture/picture-card
    listType: {
      type: String,
      default: "picture",
    },
    // 最大允许上传个数
    fileLimit: {
      type: Number,
      default: 99,
    },
  },
  data() {
    return {
      paramsData: {
        Authorization: "Bearer token",
        output: "json",
      }, // 上传携带的参数，看需求要不要
      fileList: [],
      tempFileList: [], // 因为 fileList为只读属性，所以用了一个中间变量来进行数据改变的交互。
    };
  },
  watch: {
    value: {
      handler: function (newVal, oldVa) {
        this.tempFileList = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    fileTypeName() {
      let typeName = "";
      this.fileType.forEach((item) => {
        typeName += `${item}，`;
      });
      return typeName;
    },
    fileAccept() {
      let fileAccept = "";
      this.fileType.forEach((element) => {
        fileAccept += `.${element},`;
      });
      return fileAccept;
    },
  },
  created() {
    this.fileList = this.value && JSON.parse(JSON.stringify(this.value));
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType && file) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk & file) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize && file) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    handleUploadError(err) {
      this.$message.error("上传失败, 请重试");
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`超出上传文件个数,请删除以后再上传！`);
    },
    // 文件上传成功的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("上传成功");
      this.changeFileList(fileList);
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.changeFileList(fileList);
    },
    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.$emit("input", fileList)
    },
    // 文件列表改变的时候，更新组件的v-model的文的数据
    changeFileList(fileList) {
      const tempFileList = fileList.map((item) => {
        let tempItem = {
          name: item.name,
          url: item.response ? item.response.url : item.url,
        };
        return tempItem;
      });
      this.$emit("input", tempFileList);
    },
  },
};
</script>
<style lang="less">
.images-list {
  // border: 1px dashed #d5d5d5;
  padding: 10px;
  border-radius: 4px;
  // background: #fff;
}

.el-upload-list__item {
  width: 20% !important;
  background: #fff;
}
</style>
