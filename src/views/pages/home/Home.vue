<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" class="p-3">
        <el-col :span="24" :sm="12" :md="8">
          <div v-if="activeSession && activeSession.id" class="text-center">
            <div class="pb-3">
              <el-button class="w-full" @click="resumeSession">
                Continue Learning
              </el-button>
            </div>
            <div>
              <el-button class="w-full" @click="newSession">
                Create New Session
              </el-button>
            </div>
          </div>
          <ModeSelect v-else />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ModeSelect from "@/views/pages/home/ModeSelect";

export default {
  name: "Home",
  components: { ModeSelect },
  methods: {
    resumeSession() {
      this.pushRouteName("Learn");
    },
    newSession() {
      this.clearActiveSession();
    }
  }
};
</script>
