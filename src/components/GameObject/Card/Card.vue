<template>
  <div>
    <span v-html="cardProp.description"></span>
    <RankText class="cardRankText" :rankProps="cardProp.rank"/>
    <div :class="['card-frame',isClicked ? 'card-clicked' : '']" ref="thisCard" :name="elementName">
        <img :class="['card-pic',getCardBorderColor(cardProp.rank)]" 
            :src="require('@/assets/CardImg/'+cardProp.cardImg)"
            @click="cardClick"
            />       
    </div>
    <div class="de-buff">
      <img v-for="(cardEffect, index) in cardProp.effect" :key="index" width="30px" :src="require('@/assets/De-Buff/'+cardEffect.effectImg)">
    </div>
  </div>
</template>

<script>
import RankText from '@/components/GameObject/RankText.vue'

export default {
  name: 'CardTemplate',
  props: [
    'cardProp',
    'idInDeckProp',
    'isRadioBtnProp',
    'elementName'
  ],
  components: { RankText },
  data (props) {
    const isClicked = false
    const isRadioBtn = props.isRadioBtnProp ? props.isRadioBtnProp : false
    const cardInfo = {
      id: props.idInDeckProp,
      type: props.cardProp.type,
      val: props.cardProp.val,
      effect: props.cardProp.effect
    }
    return {
      isClicked,
      cardInfo,
      isRadioBtn
    }
  },
  methods: {
    getCardBorderColor (cardRank) {
      return 'rank-' + cardRank
    },
    async cardClick () {
      if (this.isRadioBtn === true) {
        await this.UnclickOtherCard()
      }
      await this.cardClicked()
      this.sendCardInfo()
    },
    cardClicked () {
      return new Promise((resolve, reject) => {
      // this.isClicked = !this.isClicked
        this.$refs.thisCard.classList.toggle('card-clicked')
        resolve()
      })
    },
    sendCardInfo () {
      this.$emit('CardInfo', this.cardInfo)
    },
    UnclickOtherCard () {
      return new Promise((resolve, reject) => {
        document.getElementsByName(this.elementName).forEach((elm, index) => {
          elm.classList.remove('card-clicked')
          console.log(elm.classList)
        })
        resolve()
      })
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
  position: relative;
}
.card-pic{
  border-radius: 10px;
  border-width: 4px;
}
.cardRankText{
  position: absolute;
  z-index: 1;
  font-size: 1.5rem;
}
.rank-b{
  border-style: solid ;
  border-color: rgb(105, 64, 3);
}
.rank-a{
  border-style: solid ;
  border-color: rgb(165 165 165);
}
.rank-s{
  border-style: solid ;
  border-color: rgb(247, 163, 38);
}
.rank-ss{
  border-style: solid ;
  border-color: rgb(182, 211, 15);
}
.rank-sss{
  border-style: solid ;
  border-color: rgb(251, 255, 10);
}
.rank-l{
  border-style: solid ;
  border-color: rgb(241, 255, 164);
}
</style>
