<template>
  <div class="container">
      <img class="child-tag card" height="50" width="30" src="@/assets/Object/card.png" >
      <p class="child-tag card-amount">/{{ cardAmountProp }} </p>
  </div>
</template>

<script>
export default {
  name: 'ItemCounter',
  props: ['cardAmountProp']
}
</script>

<style scoped>
.container{
  margin: 8px;
  align-items: center;
  display: flex;
}
.card{
  transform: rotate(20deg);
}
.child-tag{
  display: inline-block;
  margin: 0 6px 0 5px;
}
.card-amount{
  font-size: 27px;
}
</style>
