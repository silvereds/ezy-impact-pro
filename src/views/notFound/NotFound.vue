<script setup lang="ts">
</script>
<template>
    <div class="flex-center scale-100">
          <div class="col-lg-7 mx-auto text-white">
            <div class="flex-row-between">
              <div class="">
                <h1 class="error-code">404</h1>
              </div>
              <div class="error-message-code">
                <h2>SORRY!</h2>
                <h3 class="">The page you’re looking for was not found.</h3>
              </div>
            </div>
            <div class="back-to-home">
              <div class="flex-center">
                <a class="text-white font-weight-medium" href="#">Back to home</a>
              </div>
            </div>
            <div>
              <div class="flex-center">
                <p>Copyright © {{  new Date().getFullYear() }}  All rights reserved.</p>
              </div>
            </div>
          </div>
    </div>
</template>
<style lang="scss">
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.scale-100 {
  height: 100vh;
  width: 100vw;
}
.error-code {
  font-size: 6rem;
}
.error-message-code {
  padding-inline: 2rem;
}
</style>