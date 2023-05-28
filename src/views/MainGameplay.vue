<template>
    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-md">
          <BattleZone 
                    :comboProp="actionComboFromChild"
                    />
          <CardDeck @actionCombo="sendActionCombo"/>
        </div>
      </div>
    </div>
</template>

<script>
import CardDeck from '@/components/UI/MainGame/CardDeck.vue'
import BattleZone from '@/components/UI/MainGame/BattleZone.vue'

export default {
  name: 'MainGameplay',
  components: {
    CardDeck,
    BattleZone
  },
  data () {
    const actionComboFromChild = []

    return {
      actionComboFromChild
    }
  },
  methods: {
    sendActionCombo (actionCombo) {
      this.actionComboFromChild = actionCombo
    }
  }
}
</script>

<style scoped>

</style>
