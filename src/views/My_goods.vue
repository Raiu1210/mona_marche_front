<template>
  <div class="product">
    <h1>{{ goods_info[0]["goods_name"] }}</h1>
    <img class="goods_img" :src="`https://monamarche.info${goods_info[0]['image_path']}`"><br>
    
    <h3>商品説明</h3>
    <p class="goods_info">{{ goods_info[0]["discription"] }}</p>

    <h3>連絡先</h3>
    <p class="goods_info">{{ goods_info[0]["contact"] }}</p>

    <h3>金額</h3>
    <p class="goods_info" v-if="goods_info[0]['currency'] == 'JPY'">{{Math.round( (goods_info[0]['price'] / mona_price) * 100000000) / 100000000 }} MONA</p>
    <p class="goods_info" v-else>{{ goods_info[0]['price'] }} MONA</p>

    <h3>タイムスタンプ</h3>
    <p class="goods_info">{{ goods_info[0]["timestamp"] }}</p>

    <h3>署名データ</h3>
    <p class="goods_info" >address : {{ goods_info[0]['address'] }}</p>
    <p class="goods_info" >message : {{ goods_info[0]['message'] }}</p>
    <p class="goods_info" >signature : {{ goods_info[0]['signature'] }}</p><br><br>

    <button class="delete_button" v-on:click="delete_goods()">削除する</button>
  </div>
</template>

<script>
import axios from 'axios'
import Methods from '@/api/methods'

export default {
  name: 'Goods',
  props: {
    id: Number
  },
  data() {
    return {
      mona_price: 1,
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
    async delete_goods() {
      const delete_status = await Methods.ask_delete_goods(this.id)
      console.log(delete_status)
      
      if (delete_status) {
        alert("削除したよー")
        this.$router.push('/my_goods_list')
      }
    }
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
    margin-top: 30px;
    margin-left: 10%;
    margin-right: 10%;
    text-align: left;
  }

  p.goods_info {
    margin-top: 0px;
    margin-left: 13%;
    margin-right: 5%;
    margin-bottom: 10px;
    text-align: left;
  }

  .delete_button {
    width: 160px;
    height: 70px;
    font-size: 26px;
    margin-bottom: 200px;
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    border-radius: 4px;
    color: #ffffff;
    background-image: linear-gradient(20deg, rgb(243, 7, 7) 0%, #ff8b5f 100%);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #c58668;
  }
  .delete_button:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }
</style>
