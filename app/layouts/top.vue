<template>
  <v-app>
    <div class="bgImage">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
.bgImage{
  background: url(~assets/pc.jpg) no-repeat center;
  background-size: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;/*ブラー効果でボヤけた部分を非表示*/
  height: 100vh;
}

/*:beforeにぼかし効果を設定する*/
.bgImage:before{
  content: '';
  background: inherit;/*.bgImageで設定した背景画像を継承する*/
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
  position: absolute;
  /*ブラー効果で画像の端がボヤけた分だけ位置を調整*/
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;/*重なり順序を一番下にしておく*/
}

</style>
