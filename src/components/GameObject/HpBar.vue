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
    'buffDebuffProp'],
  data (props) {
    const maxHP = props.dataProp.hp ? props.dataProp.hp : 'loading'
    const currentHP = props.dataProp.hp ? props.dataProp.hp : 'loading'
    const currentHPPercent = 100

    return {
      maxHP,
      currentHPPercent,
      currentHP
    }
  },
  watch: {
    hpChangeActionProp () {
      if (this.hpChangeActionProp.length === 0) {
        this.endTurn()
        return 0
      }
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
        this.fetchActionArray()
        setTimeout(async () => {
          await resolve()
        }, 500 * (this.hpChangeActionProp.length + 1))
      })
    },
    fetchActionArray () {
      let actionLenght = 0
      let dmgAfterBuffDebuff = 0
      return new Promise((resolve, reject) => {
        this.hpChangeActionProp.forEach((effect, index) => {
          setTimeout(async () => {
            switch (effect.type) {
              case 'atk': {
                dmgAfterBuffDebuff = await this.calcDmgByBuffDebuff(effect.val)
                await this.reduceHP(dmgAfterBuffDebuff)
                break         
              }
              case 'heal':
                this.recoverHP(effect.val)
                break
            }
            await this.calcCurrentHPPercent()
            await this.sendEffectValue(effect.type, dmgAfterBuffDebuff)
            actionLenght++
            if (actionLenght === this.hpChangeActionProp.length - 1 | actionLenght !== 0) {
              resolve()
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
    },
    calcDmgByBuffDebuff (dmg) {
      return new Promise((resolve, reject) => {
        let dmgAfterBuffDebuff = dmg
        this.buffDebuffProp.forEach((buffDebuff, index) => {
          console.log(buffDebuff)
          switch (buffDebuff.type) {
            case 'atkup':
              dmgAfterBuffDebuff += buffDebuff.val
              break
          }
        })
        resolve(dmgAfterBuffDebuff)
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
