<template>
  <div>

    <!-- 操作按钮及数据筛选表单row -->
    <div class="row mt-4 r1">

      <div class="col-2">
        <button type="button"
                class="btn btn-primary font-size-14 me-2"
                @click="insertDialogOpen">
          <i class="fa fa-plus-circle me-2"></i>生成许可证书
        </button>
      </div>

      <div class="col-10 c2">
        <el-form inline
                 :model="selectForm"
                 ref="selectForm"
                 label-suffix=":"
                 size="small"
                 class="float-end"
                 @submit.native.prevent="selectContent">
          <el-form-item label="证书授权主体"
                        prop="licenseSubject"
                        label-width="7.5rem">
            <el-input v-model.trim="selectForm.licenseSubject"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="证书所属组织"
                        prop="licenseCompany"
                        label-width="7.5rem">
            <el-input v-model.trim="selectForm.licenseCompany"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="证书状态"
                        prop="licenseStatus"
                        label-width="4.5rem">
            <el-select v-model="selectForm.licenseStatus"
                       clearable
                       placeholder="请选择">
              <el-option value="1"
                         label="有效">
              </el-option>
              <el-option value="0"
                         label="已超期">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <button class="btn btn-primary font-size-14"
                      type="submit">
                <i class="fa fa-filter me-2"></i>查询
              </button>
              <button class="btn btn-primary font-size-14"
                      type="button"
                      @click="clearSelectContent">
                <i class="fa fa-refresh me-2"></i>刷新
              </button>
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>

    <!-- 数据表格row -->
    <div class="row r2">
      <div class="col-12 c1">
        <el-table :data="pageInfo.list">
          <el-table-column label="证书授权主体(mac地址)"
                           width="250"
                           prop="licenseSubject">
          </el-table-column>
          <el-table-column label="证书所属组织"
                           width="300"
                           prop="licenseCompany">
          </el-table-column>
          <el-table-column label="证书状态"
                           width="150">
            <template slot-scope="scope">
              <span class="text-info"
                    v-if="licenseStatusFilter(scope.row.licenseExpiryCalendar) === '有效'">{{scope.row.licenseExpiryCalendar | licenseStatusFilter}}</span>
              <span class="text-danger"
                    v-else>{{scope.row.licenseExpiryCalendar | licenseStatusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="证书生效时间"
                           width="200"
                           prop="licenseIssueCalendar">
          </el-table-column>
          <el-table-column label="证书失效时间"
                           width="200"
                           prop="licenseExpiryCalendar">
          </el-table-column>
          <el-table-column label="证书备注"
                           width="200"
                           prop="licenseRemark">
          </el-table-column>
          <el-table-column label="操作"
                           width="250">
            <template slot-scope="scope">
              <div class="btn-group shadow">
                <button type="button"
                        class="btn btn-warning btn-twitter font-size-14 text-white"
                        @click="resetLicense(scope.row.id)">
                  <i class="fa fa-retweet me-2"></i>重授许可证书
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 数据表格信息及分页component -->
    <business-pagination :pageInfo="pageInfo"
                         @currentPageChangeImpl="currentPageChangeImpl"></business-pagination>

    <!-- 数据对话框 -->
    <div class="data-dialog">
      <el-dialog :title="dataDialogTitle"
                 :visible.sync="dataDialogVisible"
                 @close="dataDialogClose"
                 v-dialogDrag>
        <el-form :model="dataDialogForm"
                 ref="dataDialogForm"
                 :rules="dataDialogFormRule"
                 hide-required-asterisk
                 inline-message
                 label-suffix=":"
                 size="small">
          <el-form-item label="证书授权主体(mac地址)"
                        prop="licenseSubject"
                        label-width="12rem">
            <el-input v-model.trim="dataDialogForm.licenseSubject"
                      class="w-75"
                      maxlength="50"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="证书所属组织"
                        prop="licenseCompany"
                        label-width="12rem">
            <el-input v-model.trim="dataDialogForm.licenseCompany"
                      class="w-75"
                      maxlength="50"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="证书授权时间(月)"
                        prop="licenseTime"
                        label-width="12rem">
            <el-input-number :min="1"
                             :max="999999"
                             @blur="dataDialogForm.licenseTime = dataDialogForm.licenseTime || 1"
                             v-model="dataDialogForm.licenseTime"
                             class="w-50"></el-input-number>
          </el-form-item>
          <el-form-item label="证书备注"
                        prop="licenseRemark"
                        label-width="12rem">
            <el-input v-model.trim="dataDialogForm.licenseRemark"
                      class="w-75"
                      maxlength="50"
                      show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="danger"
                     icon="el-icon-close"
                     @click="dataDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     icon="el-icon-check"
                     @click="submitContent">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import BusinessPagination from '@components/BusinessPagination.vue'
import { getLicensePage, insertLicense, resetLicense } from '@api/license'

export default {
  name: 'BusinessLicenseInfo',
  components: {
    BusinessPagination
  },
  data () {
    let checkLicenseSubject = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('证书授权主体不能为空'))
      }
      if (!/[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}/.test(value)) {
        return callback(new Error('mac地址不正确'))
      }
      callback()
    }
    return {
      selectForm: {
        licenseSubject: '',
        licenseCompany: '',
        licenseStatus: ''
      },
      searchContent: {},
      pageInfo: {},
      currentPageNum: 1,
      dataDialogTitle: '',
      dataDialogVisible: false,
      dataDialogForm: {
        id: 0,
        licenseSubject: '',
        licenseCompany: '',
        licenseTime: 1,
        licenseRemark: ''
      },
      dataDialogFormRule: {
        licenseSubject: [{ validator: checkLicenseSubject, trigger: 'blur' }],
        licenseCompany: [{ required: true, message: '证书所属组织不能为空', trigger: 'blur' }]
      },
    }
  },
  methods: {
    getPage () {
      let sendData = { ...this.searchContent }
      sendData.pageNum = this.currentPageNum
      sendData.pageSize = 10
      getLicensePage(sendData, success => {
        this.pageInfo = success.data
      }, () => {
        this.pageInfo = {}
      })
    },
    selectContent () {
      this.searchContent = { ...this.selectForm }
      this.currentPageNum = 1
      this.getPage()
    },
    clearSelectContent () {
      this.$refs.selectForm.resetFields()
      this.selectContent()
    },
    currentPageChangeImpl (val) {
      this.currentPageNum = val
      this.getPage()
    },
    insertDialogOpen () {
      this.dataDialogTitle = '『生成许可证书窗口』'
      this.dataDialogVisible = true
    },
    resetLicense (id) {
      this.$prompt('请输入授权时间（月）', '『重授许可证书窗口』', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9][0-9]*$/,
        inputErrorMessage: '只能输入正整数',
        customClass: 'license-info-ms-box'
      }).then(({ value }) => {
        let sendData = {
          id,
          'licenseTime': value
        }
        let successCallback = success => {
          this.$message.success(success.msg)
          this.getPage()
        }
        let warnCallback = warn => { this.$message.error(warn.msg) }
        resetLicense(sendData, successCallback, warnCallback)
      }).catch(() => { })
    },
    submitContent () {
      this.$refs.dataDialogForm.validate(valid => {
        console.log(valid)
        if (valid) {
          let sendData = { ...this.dataDialogForm }
          let successCallback = success => {
            this.$message.success(success.msg)
            if (this.dataDialogForm.id === 0) {
              this.$refs.selectForm.resetFields()
              this.searchContent = { ...this.selectForm }
              this.currentPageNum = 1
            }
            this.dataDialogVisible = false
          }
          let warnCallback = warn => { this.$message.error(warn.msg) }
          if (this.dataDialogForm.id === 0) {
            insertLicense(sendData, successCallback, warnCallback)
          }
        }
      })
    },
    dataDialogClose () {
      this.getPage()
      this.dataDialogForm = {
        id: 0,
        licenseSubject: '',
        licenseCompany: '',
        licenseTime: 1,
        licenseRemark: ''
      }
      this.$refs.dataDialogForm.clearValidate()
    },
    licenseStatusFilter (value) {
      let expiryTime = new Date(value);
      let currentTime = new Date();
      if (expiryTime > currentTime) {
        return '有效'
      } else {
        return '已超期'
      }
    }
  },
  mounted () {
    this.getPage()
  }
}
</script>

<style scoped>
/* el表格重写 */
.r2 .c1 /deep/ .el-table td,
.r2 .c1 /deep/ .el-table th {
  text-align: center;
}
.r2 .c1 /deep/ .el-table {
  border-radius: 1rem;
  padding-bottom: 1px;
}
.r2 .c1 /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ffffff;
}

/* el对话框重写 */
.data-dialog /deep/ .el-dialog,
.data-dialog /deep/ .el-pager li {
  border-radius: 0.5rem;
}
</style>
<style>
/* el弹框重写 */
.license-info-ms-box {
  background-color: #192734 !important;
  border: 1px solid #192734 !important;
}
.license-info-ms-box .el-message-box__title {
  color: #f8f9fa;
}
.license-info-ms-box .el-message-box__content {
  color: #f8f9fa;
}
</style>