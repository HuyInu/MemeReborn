<template>
    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-md">
          <BattleZone />
        </div>
      </div>
    </div>
</template>

<script>
import BattleZone from '@/components/UI/MainGame/BattleZone.vue'

export default {
  name: 'MainGameplay',
  components: {
    BattleZone
  }
}
</script>

<style scoped>

</style>
