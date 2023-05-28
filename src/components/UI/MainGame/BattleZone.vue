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
  </div>
</template>

<script>
import Player from '@/components/GameObject/Player.vue'
import EnermyChar from '@/components/GameObject/EnermyChar.vue'
import HpBar from '@/components/UI/MainGame/HpBar.vue'

export default {
  name: 'MainPlayer',
  props: ['comboProp'],
  components: {
    Player,
    EnermyChar,
    HpBar
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
            val: 12
          }
        ]
      }
    }

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
      gameTurn
    }
  },
  watch: {
    comboProp () {
      this.playerAction()
    }
  },
  created () {
   
  },
  methods: {
    playerAction () {
      this.resetGameTurn()
      this.comboProp.forEach(element => {
        switch (element.type) {
          case 'atk':
            this.enermyHPChangeAction.push(element)
            break
          case 'heal':
            this.playerHPChangeAction.push(element)
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
      console.log(this.gameTurn)
      this.gameTurn++
      if (this.gameTurn === 4) {
        this.gameTurn = 0
        alert('your turn')
      } 
      if (this.gameTurn === 2) {
        alert('enermy turn')
        this.enermyAction(this.gameData.enermyData.skill)
      }
    },
    enermyFinishedTurn () {

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
