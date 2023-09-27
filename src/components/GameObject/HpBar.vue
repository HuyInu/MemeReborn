<template>
  <div class="">
    <div class="health-bar">
        <div class="health"
            :style="{'width':currentHPPercent + '%'}">
        </div>
    </div>
    <div class="health-point">
      {{ currentHP }} / {{ maxHP }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HpBar',
  props: ['hpChangeActionProp',
    'dataProp',
    'buffDebuffProp',
    'isMyTurnProp',
    'who'],
  data (props) {
    const maxHP = props.dataProp.hp ? props.dataProp.hp : 'loading'
    const currentHP = props.dataProp.hp ? props.dataProp.hp : 'loading'
    const currentHPPercent = 100

    const moreGainDmg = 0
    const moreGainHeal = 0
    const actionBuffDebuff = []
    return {
      maxHP,
      currentHPPercent,
      currentHP,
      moreGainDmg,
      moreGainHeal,
      actionBuffDebuff
    }
  },
  watch: {
    'buffDebuffProp.statusBuffDebuff' () {
      console.log(this.buffDebuffProp)
      this.moreGainDmg = 0
      this.buffDebuffProp.statusBuffDebuff.forEach((buffDebuff, index) => {
        switch (buffDebuff.type) {
          case 'atkup':
            this.moreGainDmg += buffDebuff.val
            break
        }
      })
    },
    isMyTurnProp () {
      this.startTurn()
    },
    currentHP () {
      this.calcCurrentHPPercent()
    }
  },
  created () {
  },
  methods: {
    async startTurn () {
      await this.changeHPAction()
      await this.endTurn()
    },
    changeHPAction () {
      return new Promise((resolve, reject) => {
        this.fetchAction()
        setTimeout(() => {
          resolve()
        }, 500 * (this.hpChangeActionProp.length + 1 + this.buffDebuffProp.actionBuffDebuff.length + 1))
      })
    },
    async fetchAction () {
      await this.fetchActionArray()
      if (this.isMyTurnProp) {
        await this.fetchActionBuffDebuffArray()
      }
    },
    fetchActionArray () {
      let actionLenght = 0
      let newEffectVal = 0
      return new Promise((resolve, reject) => {
        if (this.hpChangeActionProp.length === 0) {
          resolve()
        }
        this.hpChangeActionProp.forEach((effect, index) => {
          setTimeout(async () => {
            switch (effect.type) {
              case 'atk':
                newEffectVal = effect.val + this.moreGainDmg
                await this.reduceHP(newEffectVal)
                break         
              case 'heal':
                newEffectVal = effect.val
                this.recoverHP(newEffectVal)
                break
            }
            await this.calcCurrentHPPercent()
            await this.sendEffectValue(effect.type, newEffectVal)
            if (actionLenght === this.hpChangeActionProp.length - 1) {
              resolve()
            } else {
              actionLenght++
            }
          }, 500 * (index + 1))
        })
      })
    },
    fetchActionBuffDebuffArray () {
      let actionLenght = 0
      return new Promise((resolve, reject) => {
        if (this.buffDebuffProp.actionBuffDebuff.length === 0) {
          resolve()
        }
        this.buffDebuffProp.actionBuffDebuff.forEach((buffDebuff, index) => {
          setTimeout(async () => {
            switch (buffDebuff.type) {
              case 'bleed':
                await this.reduceHP(buffDebuff.val)
                break
            }
            await this.calcCurrentHPPercent()
            await this.sendEffectValue(buffDebuff.type, buffDebuff.val)
            if (actionLenght === this.buffDebuffProp.actionBuffDebuff.length - 1) {
              resolve()
            } else {
              actionLenght++
            }
          }, 500 * (index + 1))
        })
      })
    },
    reduceHP (dmg) {
      return new Promise((resolve, reject) => {
        this.currentHP -= dmg
        resolve()
      })
    },
    recoverHP (heal) {
      if (this.currentHP + heal >= this.maxHP) {
        this.currentHP = this.maxHP
      } else {
        this.currentHP += heal
      }
    },
    calcCurrentHPPercent () {
      return new Promise((resolve, reject) => { 
        this.currentHPPercent = (this.currentHP * 100) / this.maxHP
        resolve()
      })
    },
    endTurn () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$emit('finishedTurn', 1)
          resolve()
        }, 500)
      })   
    },
    sendEffectValue (effectType, val) {
      return new Promise((resolve, reject) => {
        const effect = {
          type: effectType,
          val: val
        }
        this.$emit('effectValue', effect)
        resolve()
      })
    }
  }
}
</script>

<style scoped>
.health-bar{
    width: 100%;
    border: 2px solid rgb(170, 120, 26);
    padding: 2px 5px 2px 5px;
}
.health{
    height: 20px;
    background-image: linear-gradient(rgb(241, 16, 16), rgb(255, 222, 222), rgb(218, 76, 76));
    transition: width .2s;
    width: 100%;
}
.health-point{
  font-size: 0.7vw;
  color: black;
  font-weight: bold;
}
@media only screen and (max-width: 500px) {
   .health{
    height: 11px;
   }
}
</style>
