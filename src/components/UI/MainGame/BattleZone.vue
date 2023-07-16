<template>
  <div class="">
      <div class="header ">
        <div class="row">
          <HpBar class="player-hp col "
                  :hpChangeActionProp="playerHPChangeAction"
                  :dataProp="gameData.playerData"
                  @finishedTurn="finishedAction()"
                  @effectValue="getEffectValueHP"/>
          <div class="col "></div>
          <HpBar class="enermy-hp col"
                :hpChangeActionProp="enermyHPChangeAction"
                :dataProp="gameData.enermyData" 
                @finishedTurn="finishedAction()"/>
        </div>
      </div>
      <div class="battle-zone" :style="{ 'background-image': 'url(' + require('@/assets/Scene/2.gif') + ')' }">
        <div class="row char-zone">
          <Player class="chara col" />
          <EnermyChar class="chara col"/>
        </div>
        <div class="row effect-value-zone ">
          <p class="point col animate__bounceIn effect-value" v-show="effectValue != 0">{{effectValue}}</p>
          <p class="point col animate__bounceIn effect-value">abc</p>
        </div>
      </div>
      <!-- Card deck -->
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
          rank: 'b',
          description: 'Cause',
          effect: [
            {
              type: 'atk',
              val: 5
            }
          ]
        },
        {
          id: 2,
          name: 'normalHeal.jpg',
          rank: 'a',
          description: 'Cause',
          effect: [
            {
              type: 'heal',
              val: 7
            }
          ]
        },
        {
          id: 3,
          name: 'midAtk.jpg',
          rank: 's',
          description: 'Cause',
          effect: [
            {
              type: 'atk',
              val: 7
            }
          ]
        },
        {
          id: 4,
          name: 'strongAtk.jpg',
          rank: 'ss',
          description: '<p>Cause </p>',
          effect: [
            {
              type: 'atk',
              val: 5
            },
            {
              type: 'heal',
              val: 10
            }
          ]
        },
        {
          id: 5,
          name: '+1.jpg',
          rank: 'sss',
          description: '<p>abc<\/p>',
          effect: [
            {
              type: 'card+',
              val: 1
            }
          ]
        }
      ]
    }
    const cardDeckList = []
    const cardDeckAmount = 4
    const gameTurn = 0

    const playerHPChangeAction = []
    const playerBuff = []
    const enermyHPChangeAction = []
    const enermyAtkList = []

    const effectValue = 0

    return {
      gameData,
      playerHPChangeAction,
      enermyHPChangeAction,
      playerBuff,
      enermyAtkList,
      gameTurn,
      cardDeckList,
      cardDeckAmount,
      effectValue
    }
  },
  watch: {
  },
  created () {
    this.takeCardToDeck()
  },
  methods: {
    playerAction (actionCombo) {
      const enermyHPChangeAction = []
      const playerHPChangeAction = []
      // this.resetGameTurn()
      actionCombo.forEach(card => {
        card.effect.forEach(effect => {
          switch (effect.type) {
            case 'atk':
              enermyHPChangeAction.push(effect)
              break
            case 'heal':
              playerHPChangeAction.push(effect)
              break
            case 'card+':
              this.cardDeckAmount++
              this.gameTurn++
              break
          }
        })
      })
      this.enermyHPChangeAction = enermyHPChangeAction
      this.playerHPChangeAction = playerHPChangeAction
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
      // 4 and 2 bcause two HP component return finish
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
    },
    getEffectValueHP (value) {
      Promise.resolve(
        this.effectValue = value
      ).then(
        setTimeout(() => {
          this.effectValue = 0
        }, 500)
      )
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
  overflow: hidden;
  align-items: center;
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 500px;
  position: relative;
}
.char-zone{
  padding: 20px 0 20px 0;
  display: flex;
  align-items: center;
  height: 100%;
}
.chara{
  margin-top: 100px;
  scale: 1.2;
}
.pg{
  object-fit: cover;
}
@media only screen and (max-width: 500px) {
  .battle-zone {
    height: 400px;
  }
}
.effect-value-zone{
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  align-items: center;
}
.effect-value{
  font-size: 3em;
  color: rgb(251, 255, 14);
}
</style>
