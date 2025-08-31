<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
  uni.loadFontFace({
    family: 'slidefu-regular',
    source: 'url("https://cdn.jsdelivr.net/gh/Str0keOOOO/qin-opera-qa@main/src/static/fonts/slidefu-regular.ttf")',
    global: true, // 可选，定义为全局字体
    local: true, // <-- 核心：优先使用本地缓存
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
