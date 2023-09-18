<template>
  <div>
    <button class="button"
            :style="{'background-image':'url('+require('@/assets/Button/'+btnBGProp+'')+')'}">
      {{btnTextProp}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonControl',
  props: ['btnTextProp', 'btnBGProp']
}
</script>

<style scoped>
.button{
  background-image: url('@/assets/Button/green-pixel_button.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100% ;
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;

}
.button:active{
  top: 2px;
  position: relative;
}

.button:hover{
  animation: pulse 2s infinite ;
  /* animation-iteration-count: infinite; */
}
</style>
