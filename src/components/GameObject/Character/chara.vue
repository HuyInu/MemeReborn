<template>
  <div>
      <img class="img-fluid charaIdleAnime enermy" width="300" src="@/assets/Enermy/Nyan-cat.png" alt="">
  </div>
</template>
  
<script>
export default {
  name: 'EnermyChar',
  data () {
    const Attr = {
      HP: 120,
      skill: [
        {
          type: 'atk',
          val: 12
        }
      ]
    }
    
    return {
      Attr
    }
  },
  created () {
    
  },
  methods: {
    sendInfor () {
      this.$emit('enermyAttr', this.Attr)
    },
    enermyAction () {
      this.$emit('enermyAction', this.Attr.skill)
    }
  }
}
</script>

<style scoped>
.charaIdleAnime{
  animation: indleAnimation 0.8s infinite alternate;
}

@keyframes indleAnimation {
  from {
    transform: scale(-1,1);
  }
  to {
    transform: scale(-1,0.95);
  }
}

.enermy{
}
</style>
