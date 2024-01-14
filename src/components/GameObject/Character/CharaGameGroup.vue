<template lang="">
  <div>
    <div :class="['chara-container', isHorver ? 'container-hover' : '']" 
      @mouseover="isHorver = true" 
      @mouseleave="isHorver = false" >
      <Chara class="chara"
      />
      <HpBar class="enermy-hp"
        :healthPoint="100"
      />
      <BuffEffectShower :playerTypeProp="'enermy'"/>
    </div>
  </div>
</template>
<script>
import Chara from '@/components/GameObject/Character/chara.vue'
import HpBar from '@/components/GameObject/ObjStatus/HpBar.vue'
import BuffEffectShower from '@/components/GameObject/Buff-Debuff/BuffShower.vue'
export default {
  name: 'CharaGameGroup',
  components: {
    Chara,
    HpBar,
    BuffEffectShower
  },
  props: [''],
  data () {
    const groupId = 1
    const isHorver = false

    return {
      groupId,
      isHorver
    }
  }
}
</script>
<style scoped>
  .container-hover {
    outline: red solid 2px;
  }
  /* .chara :hover {
    scale: 2;
  } */
</style>
