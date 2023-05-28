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
              v-for="(card,index) in cardList" 
              :key="index" 
              :cardProp="card"
              @cardSkill="addCardSkillToCombo"
              />
          </div>
        </div>
      </div>
      <div class="card-deck-footer">
        <CardCounter 
              :cardAmountProp="cardAmount"
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
  data () {
    const cardAmount = 0
    const actionCombo = []
    return {
      cardList: [
        {
          id: 1,
          name: 'normalAtk.jpg',
          rank: 'a',
          type: 'atk',
          val: 5
        },
        {
          id: 2,
          name: 'normalHeal.jpg',
          rank: 'a',
          type: 'heal',
          val: 7
        },
        {
          id: 3,
          name: 'normalAtk.jpg',
          rank: 'a',
          type: 'atk',
          val: 7
        }
      ],
      cardAmount,
      actionCombo
    }
  },
  methods: {
    countCardAmount () {
      this.cardAmount = this.cardList.length
    },
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
    this.countCardAmount()
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
