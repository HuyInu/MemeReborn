<template>
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
              <Card class="card-object"
                v-for="(card,index) in blessingCardProp" 
                :key="index" 
                :cardProp="card"
                :idInDeckProp="index"
                :isRadioBtnProp="true"
                @CardInfo="GetCardInfo"
                :elementName="'card-radio'"
              />
            </div>
            <div class="modal-footer">
              <Button class="btn-menu"
                        :btnTextProp="'PRAY'"
                        :btnBGProp="'yellow-pixel_button.png'"
                      />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/GameObject/Card/Card.vue'
import Button from '@/components/GameObject/Button/Button.vue'

export default {
  components: { 
    Card,
    Button 
  },
  props: [
    'blessingCardProp'
  ],
  data () {
    return {}
  },
  methods: {
    GetCardInfo (card) {
      console.log(card)
    }
  }
}
</script>

<style scoped>
.modal-content {
  border: none;
  background-color: unset;
}
.modal-body {
  display: flex;
}
.modal-footer {
  border: none;
  justify-content: center
}
.card-object {
  width: 100%;
}
</style>
