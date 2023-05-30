<template>
  <div class="">
      <div class="header ">
        <div class="row">
          <HpBar class="player-hp col "
                  :hpChangeActionProp="playerHPChangeAction"
                  :dataProp="gameData.playerData"
                  @finishedTurn="finishedAction()"/>
          <div class="col "></div>
          <HpBar class="enermy-hp col"
                :hpChangeActionProp="enermyHPChangeAction"
                :dataProp="gameData.enermyData" 
                @finishedTurn="finishedAction()"/>
        </div>
      </div>
      <div class="battle-zone" :style="{ 'background-image': 'url(' + require('@/assets/Scene/1.jpg') + ')' }">
        <div class="row char-zone">
          <Player class="player col"/>
          <EnermyChar class="col"/>
        </div>
      </div>
      <button @click="takeCardToDeck()">test</button>
      <button @click="resetCardDeck()">clear</button>
      <CardDeck @actionCombo="sendActionCombo"
                :cardDeckProp="cardDeckList"
                :cardAmountProp="cardDeckAmount"/>
  </div>
</template>

<script>
import Player from '@/components/GameObject/Player.vue'
import EnermyChar from '@/components/GameObject/EnermyChar.vue'
import HpBar from '@/components/UI/MainGame/HpBar.vue'
import CardDeck from '@/components/UI/MainGame/CardDeck.vue'

export default {
  name: 'MainPlayer',
  props: [''],
  components: {
    Player,
    EnermyChar,
    HpBar,
    CardDeck
  },
  data () {
    const gameData = {
      playerData: {
        hp: 150
      },
      enermyData: {
        hp: 200,
        skill: [
          {
            type: 'atk',
            val: 10
          }
        ]
      },
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
          name: 'midAtk.jpg',
          rank: 'a',
          type: 'atk',
          val: 7
        },
        {
          id: 4,
          name: 'strongAtk.jpg',
          rank: 's',
          type: 'atk',
          val: 10
        },
        {
          id: 5,
          name: '+1.jpg',
          rank: 'a',
          type: 'card+',
          val: 10
        }
      ]
    }
    const cardDeckList = []
    const cardDeckAmount = 3
    const gameTurn = 0

    const playerHPChangeAction = []
    const playerBuff = []
    const enermyHPChangeAction = []
    const enermyAtkList = []

    return {
      gameData,
      playerHPChangeAction,
      enermyHPChangeAction,
      playerBuff,
      enermyAtkList,
      gameTurn,
      cardDeckList,
      cardDeckAmount
    }
  },
  watch: {
  },
  created () {
    this.takeCardToDeck()
  },
  methods: {
    playerAction (actionCombo) {
      this.resetGameTurn()
      actionCombo.forEach(element => {
        switch (element.type) {
          case 'atk':
            this.enermyHPChangeAction.push(element)
            break
          case 'heal':
            this.playerHPChangeAction.push(element)
            break
          case 'card+':
            this.cardDeckAmount++
            break
        }
      })
    },
    enermyAction (enermyAction) {
      this.resetGameTurn()
      enermyAction.forEach(element => {
        switch (element.type) {
          case 'atk':
            this.playerHPChangeAction.push(element)
            break
          case 'heal':
            this.enermyHPChangeAction.push(element)
        }
      })
    },
    resetGameTurn () {
      this.playerHPChangeAction = []
      this.enermyHPChangeAction = []
    },
    finishedAction () {
      this.gameTurn++
      if (this.gameTurn === 4) {
        this.gameTurn = 0
        alert('your turn')
        this.takeCardToDeck()
      } 
      if (this.gameTurn === 2) {
        alert('enermy turn')
        this.enermyAction(this.gameData.enermyData.skill)
      }
    },
    sendActionCombo (actionCombo) {
      this.playerAction(actionCombo)
    },
    takeCardToDeck () {
      Promise.resolve(this.resetCardDeck()).then(() => {
        for (let i = 1; i <= this.cardDeckAmount; i++) {
          const randomIndex = Math.floor(Math.random() * this.gameData.cardList.length)
          this.cardDeckList.push(this.gameData.cardList[randomIndex])
        }
      })
    },
    resetCardDeck () {
      this.cardDeckList = []
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  margin: 5px 0 5px 0;
}
.battle-zone{
  align-items: center;
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 500px;
  /* position: relative; */
}
.char-zone{
  padding: 20px 0 20px 0;
  display: flex;
  align-items: center;
  height: 100%;
}
.player{

}
.pg{
  object-fit: cover;
}
@media only screen and (max-width: 500px) {
  .battle-zone {
    height: 400px;
  }
}
</style>
