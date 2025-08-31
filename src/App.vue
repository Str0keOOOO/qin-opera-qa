<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
  uni.loadFontFace({
    family: 'slidefu-regular',
    source: 'url("https://gitee.com/Str0keOOOO/slidefu-regular-font/raw/main/slidefu-regular.woff2")',
    success() {
      console.log('Slidefu remote font loaded');
    },
    fail(err) {
      console.warn('Slidefu remote font load fail', err);
    }
  });
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
</style>
