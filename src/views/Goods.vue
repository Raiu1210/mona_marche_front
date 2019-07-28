<template>
  <div class="product">
    <h1>{{ goods_info[0]["goods_name"] }}</h1>
    <img class="goods_img" :src="`https://localhost:3000/${goods_info[0]['image_path']}`"><br>
    
    <h3>商品説明</h3>
    <p>{{ goods_info[0]["discription"] }}</p>

    <h3>連絡先</h3>
    <p>{{ goods_info[0]["contact"] }}</p>

    <h3>金額</h3>
    <p v-if="goods_info[0]['currency'] == 'JPY'">{{goods_info[0]['price'] / mona_price}} MONA</p>
    <p v-else>{{ goods_info[0]['price'] }} MONA</p>

    <h3>署名データ</h3>
    <p>address : {{ goods_info[0]['address'] }}</p>
    <p>message : {{ goods_info[0]['message'] }}</p>
    <p>signature: {{ goods_info[0]['signature'] }}</p><br><br>
    
  </div>
</template>

<script>
import axios from 'axios'
import Methods from '@/api/methods'

export default {
  props: {
    id: Number
  },
  data() {
    return {
      mona_price: 0,
      goods_info: []
    }
  },
  created(){
    this.get_mona_price()
    Methods.get_goods_info(this.id).then(value => {
        this.goods_info = value["data"]
    });
  },
  methods: {
    async get_mona_price() {  
      const bitbank_api = "https://public.bitbank.cc/mona_jpy/transactions"
      let result = await axios.get(bitbank_api).then(response => (this.info = response))
      let mona_price = result["data"]["data"]["transactions"][0]["price"]
      this.mona_price = mona_price;
    },
  }
}
</script>


<style>
  img.goods_img {
    width: 400px;
    height: 400px;
    margin: auto;
    margin-top: 50px;
  }

  h1 {
    margin-top: 50px;
  }

  h3 {
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

  p {
    margin-left: 13%;
    margin-right: 5%;
    text-align: left;
  }
</style>
