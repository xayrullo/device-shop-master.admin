<template>
  <div class="app">
    <div class="app-layout">
      <el-container>
        <el-aside width="64px">
          <nav-aside />
        </el-aside>
        <el-container>
          <el-header class="header"> <Header /> </el-header>
          <el-main class="main">
            <RouterView></RouterView>
          </el-main>
          <el-footer class="footer">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .app {
    .app-layout {
      .main {
        padding: 5px 10px !important;
      }
    }
  }
}

.app {
  background: #eaeef1;
  width: 100%;
  height: 100vh;
  font-family: "Poppins", sans-serif;

  .app-layout {
    box-sizing: border-box;
    background-color: var(--code-bg-color);

    .header {
      padding: 0;
      height: 4%;
      min-height: 30px;
      max-height: 60px;
      box-sizing: border-box;
    }
    .main {
      height: 92%;
      box-sizing: border-box;
      padding: 5px 20px;
    }
    .footer {
      padding: 0;
      height: 4%;
      min-height: 30px;
      max-height: 60px;
      box-sizing: border-box;
    }
  }

  @font-face {
    font-family: "Poppins", sans-serif;
    src: url("~@/src/assets/fonts/poppins/Poppins-Regular.ttf");
  }
}
</style>

<style lang="scss">
.app {
  .el-footer {
    height: 50px;
  }
}
</style>
