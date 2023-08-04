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
  props: ['hpChangeActionProp', 'dataProp'],
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
          console.log('end action')
          await resolve()
          console.log(1000 * this.hpChangeActionProp.length)
        }, 500 * (this.hpChangeActionProp.length + 1))
      })
    },
    fetchActionArray () {
      let i = 0
      return new Promise((resolve, reject) => {
        this.hpChangeActionProp.forEach((skill, index) => {
          setTimeout(async () => {
            switch (skill.type) {
              case 'atk':
                this.reduceHP(skill.val)
                break
              case 'heal':
                this.recoverHP(skill.val)
                break
            }
            // await this.sendEffectValue(skill.val) 
            console.log(500 * (index + 1))
            await this.calcCurrentHPPercent()
            await this.sendEffectValue(skill)
            i++
            if (i === this.hpChangeActionProp.length - 1 | i !== 0) {
              console.log('while')
              resolve()
            }
          }, 500 * (index + 1))
        })
      })
    },
    reduceHP (dmg) {
      this.currentHP -= dmg
      console.log('reduce')
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
        console.log('end cal')
        resolve()
      })
    },
    endTurn () {
      return new Promise((resolve, reject) => {
        console.log('end turn')
        setTimeout(() => {
          this.$emit('finishedTurn', 1)
          resolve()
        }, 500)
      })   
    },
    sendEffectValue (value) {
      return new Promise((resolve, reject) => {
        console.log('send value')
        this.$emit('effectValue', value)
        resolve()
      })
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve(), ms))
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
