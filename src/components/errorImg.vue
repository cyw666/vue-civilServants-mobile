<template>
  <img class="errorImg" :src="imageSrc" ref="img"/>
</template>
<script>
  import baseErrorSrc from '../assets/notFound.jpg'

  export default {
    data() {
      return {
        imageSrc: this.src,
        imgErrorSrc: this.errorSrc
      }
    },
    mounted() {
      this.$refs.img.onerror = () => {
        this.imageSrc = this.imgErrorSrc || baseErrorSrc
      }
    },
    props: ['src', 'errorSrc'],

  }
</script>
