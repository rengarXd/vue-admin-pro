<template>
  <el-card class="cpdf">
    <div class="center">
      <div class="contor">
        <el-button @click="prev">上一页</el-button>
        <span>
          页数:
          <span v-text="page_num" /> /
          <span v-text="page_count" />
        </span>

        <el-button @click="next">下一页</el-button>
        <el-button icon="el-icon-plus" @click="addscale" />
        <el-button icon="el-icon-minus" @click="minus" />
        <!-- <el-button id="prev" @click="closeDialog">重置</el-button> -->
      </div>
      <canvas id="the-canvas" class="canvasstyle" />
    </div>
  </el-card>
</template>
<script>
import PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc = "./../../../node_modules/pdfjs-dist/build/pdf.worker.js";
import request from "@/utils/request";
import { Message } from "element-ui";

export default {
  name: "pdf",
  props: {
    seeFileId: {
      type: Number,
      default: null
    },
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      closeModel: false,
      clearable: false,
      urlPrefix: process.env.BASE_API,
      dialogTitle: "浏览技术文档",
      pdfurl: "",
      loading: false,
      pdfDoc: null, // pdfjs 生成的对象
      pageNum: 1, //
      pageRendering: false,
      pageNumPending: null,
      scale: 1.2, // 放大倍数
      page_num: 0, // 当前页数
      page_count: 0, // 总页数
      maxscale: 2, // 最大放大倍数
      minscale: 0.8 // 最小放大倍数
    };
  },
  computed: {
    ctx() {
      const id = document.getElementById("the-canvas");
      return id.getContext("2d");
    }
  },
  created() {
    this.onOpenTest();
  },
  watch: {
    url(val) {
      this.onOpenTest();
    }
  },
  methods: {
    closeDialog(freshList) {
      const _this = this;
      _this.pdfurl = "";
      _this.pdfDoc = null;
      _this.pageNum = 1;
      _this.pageRendering = false;
      _this.pageNumPending = null;
      _this.scale = 1.2;
      _this.page_num = 0;
      _this.page_count = 0;
      // PDFJS.getDocument(_this.pdfurl).then(function(pdfDoc_) {
      //   _this.pdfDoc = pdfDoc_
      //   _this.page_count = _this.pdfDoc.numPages
      //   _this.renderPage(_this.pageNum)
      // })
      this.$emit("refreshValue", freshList);
    },
    onOpenTest() {
      const _this = this;
      _this.pdfurl = _this.url;
      PDFJS.getDocument(_this.pdfurl).then(function(pdfDoc_) {
        _this.pdfDoc = pdfDoc_;
        _this.page_count = _this.pdfDoc.numPages;
        _this.renderPage(_this.pageNum);
      });
    },
    onOpen() {
      const _this = this;
      _this.loading = true;
      request({
        url: "/document/info/preview/" + _this.seeFileId,
        method: "get"
      }).then(function(value) {
        if (value.code === 200) {
          _this.pdfurl = _this.urlPrefix + "/" + value.data.fileVirtualPath;
          _this.loading = false;
          // 初始化pdf
          PDFJS.getDocument(_this.pdfurl).then(function(pdfDoc_) {
            _this.pdfDoc = pdfDoc_;
            _this.page_count = _this.pdfDoc.numPages;
            _this.renderPage(_this.pageNum);
          });
        } else {
          Message.error(value.message);
          _this.loading = false;
          _this.closeDialog();
        }
      });
    },
    renderPage(num) {
      // 渲染pdf
      const vm = this;
      this.pageRendering = true;
      const canvas = document.getElementById("the-canvas");
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(vm.scale);
        // alert(vm.canvas.height)
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: vm.ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        // Wait for rendering to finish
        renderTask.promise.then(function() {
          vm.pageRendering = false;
          if (vm.pageNumPending !== null) {
            // New page rendering is pending
            vm.renderPage(vm.pageNumPending);
            vm.pageNumPending = null;
          }
        });
      });
      vm.page_num = vm.pageNum;
    },
    addscale() {
      // 放大
      if (this.scale >= this.maxscale) {
        return;
      }
      this.scale += 0.1;
      this.queueRenderPage(this.pageNum);
    },
    minus() {
      // 缩小
      if (this.scale <= this.minscale) {
        return;
      }
      this.scale -= 0.1;
      this.queueRenderPage(this.pageNum);
    },
    prev() {
      // 上一页
      const vm = this;
      if (vm.pageNum <= 1) {
        return;
      }
      vm.pageNum--;
      vm.queueRenderPage(vm.pageNum);
    },
    next() {
      // 下一页
      const vm = this;
      if (vm.pageNum >= vm.page_count) {
        return;
      }
      vm.pageNum++;
      vm.queueRenderPage(vm.pageNum);
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    }
  }
};
</script>
<style scoped type="text/css">
.cpdf {
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: #999999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  text-align: center;
  height: 100%;
  overflow: auto;
}
.contor {
  margin-bottom: 10px;
}
.button-group {
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>