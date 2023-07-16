<template>
    <div>
      <div class="card-deck"
            :style="{ 'background-image': 'url(' + require('@/assets/Background/1.jpg') + ')' }">
        <div class="row">
          <!--Menu-->
          <div class="h-100 action-menu col-lg-2 row justify-content-center">
            <Button class=" btn-menu col-lg-12 col-md "
                    :btnTextProp="'END TURN'"
                    :btnBGProp="'green-pixel_button.png'"
                    @click.native="endTurnButtonClick ()"/>
            <Button class=" btn-menu col-lg-12 col-md "
                    :btnTextProp="'SKIP'"
                    :btnBGProp="'yellow-pixel_button.png'"
                   />
          </div>
          <!--Card list-->
          <div class="card-show col-lg-10">
            <!--Card List-->
            <Card class="card-object animate__animated animate__backInRight" 
              v-for="(card,index) in cardDeckProp" 
              :key="index" 
              :cardProp="card"
              :idInDeckProp="index"
              @CardInfo="addCardToCombo"
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
import Button from '@/components/UI/Button/Button.vue'

export default {
  name: 'CardDeck',
  components: {
    Card,
    CardCounter,
    Button
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
    addCardToCombo (cardSkill) {
      if (this.checkExistedCard(this.actionCombo, cardSkill.id)) {
        this.actionCombo.push(cardSkill)
      } else {
        this.actionCombo = this.removeCard(this.actionCombo, cardSkill.id)
      }
    },
    checkExistedCard (comboList, cardID) {
      const result = comboList.find(item => item.id === cardID)
      return result === undefined
    },
    removeCard (comboList, cardID) {
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
  padding: 6px 20px 6px 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.card-show{
  overflow-x: auto;
  white-space: nowrap;
  border: solid 2px #7700f9;
  border-radius: 12px;
  box-shadow: 2px 3px 3px 0px #400547;
  background-color: #09a16754;
}
.btn-menu{
  height: 41px;
  margin: 2px 0 2px 0;
  max-width: 278px;
}
.action-menu{
  margin: 0 0 5px 0
}
.card-deck-footer{
  text-align: start;
}
</style>
