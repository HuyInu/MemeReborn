<template>
  <div class="component-container">
    <img class="" :src="require('@/assets/De-Buff/'+buff_debuffItemProp.effectImg)"/>
    <div :class="['buff-count-down-container',
                  playerTypeProp === 'player' ? 'rightSide' : 'leftSide']">
        <p class="buff-count-down">{{buff_debuffItemProp.duration}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuffItem',
  props: [
    'playerTypeProp',
    'buff_debuffItemProp'],
  created () {
  }
}
</script>

<style scoped>
img{
    width: 100%;
    height: auto;
}
.component-container{
    width: 2vw;
    min-width: 32px;
    margin: 0 6px 0 6px;
    position: relative;
    z-index: 1;
}

.rightSide{
    right: -12px;
}

.leftSide{
    left: -12px;
}

.reverse{
    transform: scaleX(-1);
}

.buff-count-down-container{
    position: absolute;
    bottom: -86%;
    width: 80%;
    height: 80%;
    background-color: #ffa7a7;
    border-radius: 50%;
}

.buff-count-down{
    font-size: 0.9rem;
}
</style>
