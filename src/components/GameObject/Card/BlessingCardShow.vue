
import Vue from 'vue';
<template>
  <div>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
        <Card :cardProp="demoCard"/>
        <Card :cardProp="demoCard"/>
        <Card :cardProp="demoCard"/>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import Card from '@/components/GameObject/Card/Card.vue'

export default {
  components: { Card },
  data () {
    const demoCard = {
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
    }
    return {
      demoCard
    }
  }
}
</script>

<style scoped>
.modal-content {
  flex-direction: unset;
  border: none;
  background-color: unset;
}
</style>
