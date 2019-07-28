<template>
  <div class="product">
    <h1>{{ goods_info[0]["goods_name"] }}</h1>
    <img class="goods_img" :src="`https://localhost:3000/${goods_info[0]['image_path']}`"><br><br>
    {{ goods_info }} 
    <br><br>
    
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  props: {
    id: Number
  },
  data() {
    return {
      goods_info: []
    }
  },
  created(){
    Methods.get_goods_info(this.id).then(value => {
        this.goods_info = value["data"]
    });
  },
  methods: {
    get_goods_info(id) {

    }
  }
}
</script>


<style>
  img.goods_img {
    width: 500px;
    height: 500px;
    margin: auto;
  }
</style>
