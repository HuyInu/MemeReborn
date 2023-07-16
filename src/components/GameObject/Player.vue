<template>
  <div class="playerContainer">
    <img class="img-fluid charaIdleAnime" width="300" 
          src="@/assets/Character/Chad.png" 
          alt="">
  </div>
</template>

<script>
export default {
  name: 'MainPlayer',
  data () {
    const Attr = {
      HP: 120
    }
    return {
      Attr
    }
  },
  created () {
   
  },
  methods: {
    sendInfor () {
      this.$emit('playerAttr', this.Attr)
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
    transform: scale(1, 1);
  }
  to {
    transform: scale(1, 0.95);
  }
}
</style>
