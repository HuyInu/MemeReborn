<template lang="">
  <div class="group-container">
      <CharaGameGroup v-for="(chara, index) in charaArr"
                      :key="index"
                      />
  </div>
</template>
<script>
import CharaGameGroup from '@/components/GameObject/Character/CharaGameGroup.vue'
export default {
  name: 'CharaGroupList',
  props: [''],
  components: {
    CharaGameGroup
  },
  data () {
    const charaArr = [
      {
        name: 'a'
      },
      {
        name: 'a'
      },
      {
        name: 'a'
      }
    ]

    return {
      charaArr
    }
  }
}
</script>
<style scoped>
  .group-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>
