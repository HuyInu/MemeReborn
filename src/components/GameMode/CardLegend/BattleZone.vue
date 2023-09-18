<template>
  <div class="">
      <div class="header ">
        <div class="row">
          <HpBar class="player-hp col "
                  :hpChangeActionProp="playerHPChangeAction"
                  :dataProp="gameData.playerData"
                  :buffDebuffProp="playerBuffDebuff"
                  @finishedTurn="finishedAction()"
                  @effectValue="showEffectHPPlayer"/>
          <div class="col"></div>
          <HpBar class="enermy-hp col"
                :hpChangeActionProp="enermyHPChangeAction"
                :dataProp="gameData.enermyData" 
                :buffDebuffProp="enermyBuffDebuff"
                @finishedTurn="finishedAction()"
                @effectValue="showEffectHPEnermy"/>
        </div>
        <div class="row">
          <div class="col">
            <BuffEffectShower :playerTypeProp="'player'"
                              :buff_debuffEffectProp="playerBuffDebuff"/>
          </div>
          <div class="col"></div>
          <div class="col">
            <BuffEffectShower :playerTypeProp="'enermy'"/>
          </div>
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
      <BlessingCardShow/>
      <!-- Card deck -->
      <CardDeck @actionCombo="sendActionCombo"
                :cardDeckProp="cardDeckList"
                :cardAmountProp="cardDeckAmount"/>
  </div>
</template>

<script>
import Player from '@/components/GameObject/Player.vue'
import EnermyChar from '@/components/GameObject/EnermyChar.vue'
import HpBar from '@/components/GameObject/HpBar.vue'
import CardDeck from '@/components/GameObject/Card/CardDeck.vue'
import BuffEffectShower from '@/components/GameObject/Buff-Debuff/BuffShower.vue'
import BlessingCardShow from '@/components/GameObject/Card/BlessingCardShow.vue'

export default {
  name: 'MainPlayer',
  props: [''],
  components: {
    Player,
    EnermyChar,
    HpBar,
    CardDeck,
    BuffEffectShower,
    BlessingCardShow
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
          cardImg: 'normalAtk.jpg',
          rank: 'b',
          description: 'Cause',
          effect: [
            {
              type: 'atkup',
              effectImg: 'atkup.png',
              val: 50,
              duration: 2
            },
            {
              type: 'maxhpup',
              effectImg: 'atkup.png',
              val: 50,
              duration: 3
            }
          ]
        },
        {
          id: 2,
          name: 'normalHeal.jpg',
          cardImg: 'normalHeal.jpg',
          rank: 'a',
          description: 'Cause',
          effect: [
            {
              type: 'heal',
              effectImg: 'heal.png',
              val: 7
            }
          ]
        },
        {
          id: 3,
          name: 'midAtk.jpg',
          cardImg: 'midAtk.jpg',
          rank: 's',
          description: 'Cause',
          effect: [
            {
              type: 'atk',
              effectImg: 'atk.png',
              val: 7
            }
          ]
        }
        // {
        //   id: 4,
        //   name: 'strongAtk.jpg',
        //   cardImg: 'strongAtk.jpg',
        //   rank: 'ss',
        //   description: '<p>Cause </p>',
        //   effect: [
        //     {
        //       type: 'atk',
        //       effectImg: 'atk.png',
        //       val: 5
        //     },
        //     {
        //       type: 'heal',
        //       effectImg: 'heal.png',
        //       val: 10
        //     }
        //   ]
        // },
        // {
        //   id: 5,
        //   name: '+1.jpg',
        //   cardImg: '+1.jpg',
        //   rank: 'sss',
        //   description: '<p>abc<\/p>',
        //   effect: [
        //     {
        //       type: 'card+',
        //       effectImg: 'card+.png',
        //       val: 1
        //     }
        //   ]
        // }
      ]
    }
    const test = 1
    const cardDeckList = []
    const cardDeckAmount = 4
    const gameTurn = 0

    const playerHPChangeAction = []
    const playerBuffDebuff = []
    const enermyHPChangeAction = []
    const enermyAtkList = []
    const enermyBuffDebuff = []

    const effectValueToPlayer = {
      type: null,
      val: 0
    }
    const effectValueToEnermy = {
      type: null,
      val: 0
    }

    return {
      test,
      gameData,
      playerHPChangeAction,
      enermyHPChangeAction,
      playerBuffDebuff,
      enermyAtkList,
      enermyBuffDebuff,
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
            case 'atkup':
              this.enermyBuffDebuff.push(effect)
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
      // 4 and 2 bcause two HP component return finished
      if (this.gameTurn === 4) {
        this.gameTurn = 0
        await this.showModalChangeTurn()
        await this.clearCardDeck()
        await this.takeCardToDeck()
      } 
      if (this.gameTurn === 2) {
        await this.DecreaseBuffDebuffDuration()
        await this.showModalChangeTurn()
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
          const card = JSON.parse(JSON.stringify(this.gameData.cardList[randomIndex]))
          this.cardDeckList.push(card)
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
    showEffectHPPlayer (effect) {
      return new Promise((resolve, reject) => {
        this.effectValueToPlayer.type = effect.type
        this.effectValueToPlayer.val = effect.val
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
    showModalChangeTurn () {
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
    },
    DecreaseBuffDebuffDuration (decreaseValue) {
      return new Promise((resolve, reject) => {
        console.log(this.playerBuffDebuff)
        let index = 0
        while (index !== this.playerBuffDebuff.length) {
          this.playerBuffDebuff[index].duration--
          if (this.playerBuffDebuff[index].duration === 0) {
            this.RemoveBuffDebuff(this.playerBuffDebuff[index])
          } else {
            index++
          }
        }
        resolve()
      })
    },
    RemoveBuffDebuff (buffDebuff) {
      return new Promise((resolve, reject) => {
        const buffDebuffIndex = this.playerBuffDebuff.indexOf(buffDebuff)
        if (buffDebuffIndex > -1) {
          this.playerBuffDebuff.splice(buffDebuffIndex, 1)
        }
        resolve()
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
