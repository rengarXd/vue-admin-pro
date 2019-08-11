<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="活动面板" name="activity">
                <!-- <activity /> -->
              </el-tab-pane>
              <el-tab-pane label="时间轴" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="账号" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
// import Activity from './components/Activity'
import Timeline from "./components/Timeline";
import Account from "./components/Account";

export default {
  name: "Profile",
  components: { UserCard, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: "activity"
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "role", "user/description", "account"])
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.role,
        avatar: this.avatar,
        description: this.description,
        userAccount: this.account
      };
    }
  }
};
</script>
