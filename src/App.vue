<template>
  <div id="app">
    <router-view />
    <service-worker-update-popup />
  </div>
</template>

<script>
import ServiceWorkerUpdatePopup from "@/pwa/components/ServiceWorkerUpdatePopup.vue";
export default {
  name: "App",
  components: {
    ServiceWorkerUpdatePopup
  }
};
</script>
