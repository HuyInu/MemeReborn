<template>
  <div class="">
    <div class="health-bar">
        <div class="health"
              :style="{'width':currentHPPercent + '%'}">
          {{ this.currentHP }}
        </div>
        
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
      Promise.resolve(this.changeHPAction()).then(this.endTurn())
    },
    currentHP () {
      this.calcCurrentHPPercent()
    }
  },
  created () {
  },
  methods: {
    changeHPAction () {
      this.hpChangeActionProp.forEach(skill => {
        switch (skill.type) {
          case 'atk':
            this.reduceHP(skill.val)
            break
          case 'heal':
            this.recoverHP(skill.val)
            break
        }
      })
    },
    reduceHP (dmg) {
      this.currentHP -= dmg
      console.log(dmg + '-' + this.currentHP)
    },
    recoverHP (heal) {
      if (this.currentHP + heal >= this.maxHP) {
        this.currentHP = this.maxHP
      } else {
        this.currentHP += heal
      }
    },
    calcCurrentHPPercent () {
      this.currentHPPercent = (this.currentHP * 100) / this.maxHP
      console.log(this.currentHPPercent)
    },
    endTurn () {
      this.$emit('finishedTurn', 1)
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
}
@media only screen and (max-width: 500px) {
   .health{
    height: 11px;
   }
}
</style>
