<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";

onLaunch(() => {
  console.log('App Launch');
  const slidefuFontData = 'https://cdn.aredhel.site/fonts/slidefu-regular-croped.woff2';
  uni.loadFontFace({
    family: 'slidefu-regular',
    source: `url("${slidefuFontData}")`,
    global: true,
    local: true,
    success() {
      console.log('Slidefu base64 font loaded');
    },
    fail(err) {
      console.warn('Slidefu base64 font load fail', err);
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
