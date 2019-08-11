<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Guide from './guide'

export default {
  name: 'Dashboard',
  components: { Guide },
  data() {
    return {
      currentRole: 'Guide'
    }
  }
}
</script>
