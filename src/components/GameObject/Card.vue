<template>
  <div>
    <div :class="['card-frame',isClicked ? 'card-clicked' : '']">
        <img  :class="['card-pic',getCardBorderColor(cardProp.rank)]" 
            :src="require('@/assets/CardImg/'+cardProp.name)"
            :id="cardProp.id"
            @click="cardClick"
            />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTemplate',
  props: ['cardProp', 'idInDeckProp'],
  data (props) {
    const isClicked = false

    const cardSkill = {
      id: props.idInDeckProp,
      type: props.cardProp.type,
      val: props.cardProp.val
    }
    return {
      isClicked,
      cardSkill
    }
  },
  methods: {
    getCardBorderColor (cardRank) {
      switch (cardRank) {
        case 'a' :
          return 'rank-a'
        case 's' :
          return 'rank-s'
        default :
          return 'rank-a'
      }
    },
    cardHover () {
      
    },
    cardClick () {
      this.cardClicked()
      this.sendCardSkill()
    },
    cardClicked () {
      this.isClicked = !this.isClicked
    },
    cardUnClicked (event) {
      
    },
    sendCardSkill () {
      this.$emit('cardSkill', this.cardSkill)
    }
  }
}
</script>

<style scoped>
.card-frame img{
  max-width: 100%;
  height: auto;
}
.card-frame{
    margin: 5px 12px 5px 3px;
    cursor: pointer;
}
.card-frame :hover {
  transition: outline .2s;
  outline: 8px solid rgb(255, 184, 211);
  z-index: 1;
  position: relative;
}
@media only screen and (max-width: 500px) {
  .card-frame :hover {
    outline: none;
  }
}
.card-clicked {
  outline: 8px solid rgb(255, 93, 93);
  border-radius: 10px;
  z-index: 2;
  position: relative;
  
}
.card-pic{
    padding: 2px;
    border-radius: 10px;
    border: 4px
}
.rank-a{
    border: solid rgb(105, 64, 3);
}
.rank-s{
    border: solid rgb(232, 255, 29);
}
</style>
