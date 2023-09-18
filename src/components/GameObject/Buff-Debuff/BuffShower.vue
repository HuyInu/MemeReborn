<template>
  <div :class="['buff-shower-container',
                playerTypeProp === 'player' ? 'float-start' : 'float-end']">
    <BuffItem :class="['d-inline-block', 
                      'animate__animated',
                      'animate__pulse']" 
              :playerTypeProp="playerTypeProp" 
              v-for="(buff_debuffItem, index) in buff_debuffEffectProp"
              :key="index" 
              :buff_debuffItemProp="buff_debuffItem"
              />
  </div>
</template>

<script>
import BuffItem from '@/components/GameObject/Buff-Debuff/BuffItem.vue'

export default {
  name: 'BuffShower',
  props: [
    'playerTypeProp',
    'buff_debuffEffectProp'],
  components: {
    BuffItem
  }
}
</script>

<style scoped>
.buff-shower-container {
  margin: 1px 2px 1px 2px;
}

</style>
