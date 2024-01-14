<template>
    <div class="main-content root">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-md">
          <BattleZone />
        </div>
      </div>
    </div>
</template>

<script>
import BattleZone from '@/components/GameMode/CardLegend/BattleZone.vue'

export default {
  name: 'MainGameplay',
  components: {
    BattleZone
  }
}
</script>

<style scoped>
.root {
  background-color: rgb(12 12 12);
}
</style>
