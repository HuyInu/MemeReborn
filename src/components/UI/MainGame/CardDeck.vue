<template>
    <div>
      <div class="card-deck ">
        <div class="row">
          <div class="action-menu col-lg-2 col-md-12 row">
            <button class="col-lg-12 col-md-8"
                    @click="endTurnButtonClick ()"
            >End turn</button>
            <button class="col-lg-12 col-md-8">End turn</button>
          </div>
          <div class="card-show col-lg">
            <Card class="card-object" 
              v-for="(card,index) in cardDeckProp" 
              :key="index" 
              :cardProp="card"
              :idInDeckProp="index"
              @cardSkill="addCardSkillToCombo"
              />
          </div>
        </div>
      </div>
      <div class="card-deck-footer">
        <CardCounter 
              :cardAmountProp="cardAmountProp"
                />
      </div>
    </div>
    
</template>

<script>
import Card from '@/components/GameObject/Card.vue'
import CardCounter from '@/components/UI/MainGame/ItemCounter.vue'

export default {
  name: 'CardDeck',
  components: {
    Card,
    CardCounter
  },
  props: ['cardDeckProp', 'cardAmountProp'],
  data (props) {
    // const cardAmount = 0
    const actionCombo = []
    return {
      // cardList: props.cardDeckProp,
      // cardAmount,
      actionCombo
    }
  },
  watch: {
  },
  methods: {
    addCardSkillToCombo (cardSkill) {
      if (this.checkExistedCard(this.actionCombo, cardSkill.id)) {
        this.actionCombo.push(cardSkill)
      } else {
        this.actionCombo = this.removeCardSkill(this.actionCombo, cardSkill.id)
      }
      console.log(this.actionCombo)
    },
    checkExistedCard (comboList, cardID) {
      const result = comboList.find(item => item.id === cardID)
      return result === undefined
    },
    removeCardSkill (comboList, cardID) {
      const result = comboList.filter(item => item.id !== cardID)
      return result
    },
    sendActionCombo () {
      this.$emit('actionCombo', this.actionCombo)
    },
    clearActionCombo () {
      this.actionCombo = []
    },
    endTurnButtonClick () {
      this.sendActionCombo()
      this.clearActionCombo()
    }
  },
  created () {
  }
}
</script>

<style scoped>
.card-object{
  display: inline-block;
  max-width: 20%;
  min-width: 149px;
}
.card-deck{
  border: 5px solid black;
  overflow-x: auto;
  white-space: nowrap;
  padding: 6px 0 6px 0;
}
.card-deck-footer{
  text-align: start;
}
</style>
