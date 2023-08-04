<template>
  <div class="">
      <div class="header ">
        <div class="row">
          <HpBar class="player-hp col "
                  :hpChangeActionProp="playerHPChangeAction"
                  :dataProp="gameData.playerData"
                  @finishedTurn="finishedAction()"
                  @effectValue="showEffectHPPlayer"/>
          <div class="col "></div>
          <HpBar class="enermy-hp col"
                :hpChangeActionProp="enermyHPChangeAction"
                :dataProp="gameData.enermyData" 
                @finishedTurn="finishedAction()"
                @effectValue="showEffectHPEnermy"/>
        </div>
      </div>
      <b-modal ref="modal-1" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
      </b-modal>
      <div class="battle-zone" :style="{ 'background-image': 'url(' + require('@/assets/Scene/2.gif') + ')' }">
        
        <div class="row char-zone">
          <Player class="chara col" />
          <EnermyChar class="chara col"/>
        </div>
        <!--Effect value-->
        <div class="row effect-value-zone ">
          <p :class="['col' ,'animate__bounceIn','effect-value', getColorEffectValue(effectValueToPlayer.type)]" v-show="effectValueToPlayer.val != 0">{{effectValueToPlayer.val}}</p>
          <p class="col" v-show="effectValueToPlayer.val == 0">&nbsp;</p>
          <p :class="['col' ,'animate__bounceIn','effect-value',getColorEffectValue(effectValueToEnermy.type)]" v-show="effectValueToEnermy.val != 0">{{effectValueToEnermy.val}}</p>
          <p class="col" v-show="effectValueToEnermy.val == 0">&nbsp;</p>
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
          },
          {
            type: 'atk',
            val: 5
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

    const effectValueToPlayer = {
      type: null,
      val: 0
    }
    const effectValueToEnermy = {
      type: null,
      val: 0
    }

    return {
      gameData,
      playerHPChangeAction,
      enermyHPChangeAction,
      playerBuff,
      enermyAtkList,
      gameTurn,
      cardDeckList,
      cardDeckAmount,
      effectValueToPlayer,
      effectValueToEnermy
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
      return new Promise((resolve, reject) => {
        const enermyHPChangeAction = []
        const playerHPChangeAction = []
        enermyAction.forEach(element => {
          switch (element.type) {
            case 'atk':
              playerHPChangeAction.push(element)
              break
            case 'heal':
              enermyHPChangeAction.push(element)
              break
          }
        })
        this.enermyHPChangeAction = enermyHPChangeAction
        this.playerHPChangeAction = playerHPChangeAction
        resolve()
      })
    },
    resetGameTurn () {
      return new Promise((resolve, reject) => {
        this.playerHPChangeAction = []
        this.enermyHPChangeAction = []
        resolve()
      })
    },
    async finishedAction () {
      this.gameTurn++
      // 4 and 2 bcause two HP component return finish
      if (this.gameTurn === 4) {
        this.gameTurn = 0
        
        // alert('your turn')
        await this.showMoDalChangeTurn()
        await this.clearCardDeck()
        await this.takeCardToDeck()
      } 
      if (this.gameTurn === 2) {
        await this.showMoDalChangeTurn()
        this.enermyAction(this.gameData.enermyData.skill)
      }
    },
    sendActionCombo (actionCombo) {
      this.playerAction(actionCombo)
    },
    takeCardToDeck () {
      return new Promise((resolve, reject) => {
        for (let i = 1; i <= this.cardDeckAmount; i++) {
          const randomIndex = Math.floor(Math.random() * this.gameData.cardList.length)
          this.cardDeckList.push(this.gameData.cardList[randomIndex])
        }
        resolve()
      })
    },
    clearCardDeck () {
      return new Promise((resolve, reject) => {
        this.cardDeckList = []
        resolve()
      })
    },
    showEffectHPPlayer (skill) {
      return new Promise((resolve, reject) => {
        this.effectValueToPlayer.type = skill.type
        this.effectValueToPlayer.val = skill.val
        resolve()
      }).then(
        setTimeout(() => {
          this.effectValueToPlayer.val = 0
        }, 470)
      )   
    },
    showEffectHPEnermy (skill) {
      return new Promise((resolve, reject) => {
        this.effectValueToEnermy.type = skill.type
        this.effectValueToEnermy.val = skill.val
        resolve()
      }).then(
        setTimeout(() => {
          this.effectValueToEnermy.val = 0
        }, 470)
      )   
    },
    getColorEffectValue (skillType) {
      switch (skillType) {
        case 'atk':
          return 'dmgVal'
        case 'heal':
          return 'healVal'
      }
    },
    showMoDalChangeTurn () {
      return new Promise((resolve, reject) => {
        this.$refs['modal-1'].show()
        setTimeout(() => {
          this.$refs['modal-1'].hide()
          resolve()
        }, 800)
      })
    },
    closeMoDalChangeTurn () {
      return new Promise((resolve, reject) => {
        this.$refs['modal-1'].hide()
        setTimeout(() => {
          resolve()
        }, 500)
      })
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
.dmgVal{
  color: red;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.healVal{
  color: rgb(9, 241, 1);
  text-shadow: -1px 0 rgb(185, 255, 153), 0 1px rgb(185, 255, 153), 1px 0 rgb(185, 255, 153), 0 -1px rgb(185, 255, 153);
}
</style>
