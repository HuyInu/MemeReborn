<template>
  <p :class="['rank-text',getCardBorderColor(rankProps)]">{{rankProps}}</p>
</template>

<script>
export default {
  name: 'rankText',
  props: ['rankProps'],
  methods: {
    getCardBorderColor (cardRank) {
      return 'rank-text-' + cardRank
    }
  }
}
</script>

<style scoped>
.rank-text{
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
}
.rank-text-b{
  color: rgb(105, 64, 3);
}
.rank-text-a{
  color: rgb(165 165 165);
}
.rank-text-s{
  color: rgb(247, 163, 38);
}
.rank-text-ss{
  color: rgb(182, 211, 15);
}
.rank-text-sss{
  color: rgb(251, 255, 10);
}
.rank-text-l{
  color: rgb(241, 255, 164);
}
</style>
