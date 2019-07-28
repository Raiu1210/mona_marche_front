<template>
  <div id="goods_list">
    <ul id="example-1">
      <li v-for="{id, goods_name, contact, price, currency, image_path} in goods_list" :key="id">
        <router-link :to="`/goods_list/${ id }`">
          <img class="thumb_nail" :src="`https://localhost:3000/${image_path}`"><br><br>
          <h2 class="goods_name">{{ goods_name }}</h2><br><br>
          <h3>出品者 {{contact}}</h3><br>
          <h3 v-if="currency == 'JPY'">{{price / mona_price}} MONA</h3>
          <h3 v-else>{{price}} MONA</h3>
        </router-link>
      </li>
    </ul>

    <br><br>

    {{ goods_list }}

     <br><br>
     {{mona_price}}
  </div>
</template>

<script>
import axios from 'axios'
import Methods from '@/api/methods'

export default {
  name: 'goods_list',
  data() {
    return {
      mona_price: 0,
      goods_list:[],
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  },
  created(){
    let a = this.get_goods_list()
    let b = this.get_mona_price()
  },
  methods: {
    async get_mona_price() {  
      const bitbank_api = "https://public.bitbank.cc/mona_jpy/transactions"
      let result = await axios.get(bitbank_api).then(response => (this.info = response))
      let mona_price = result["data"]["data"]["transactions"][0]["price"]
      this.mona_price = mona_price;
    },
    get_goods_list() {
      let goods_list = Methods.get_goods_list().then(value => {
        this.goods_list = value["data"]
      });
    },
  }
}
</script>


<style>
  * {
    margin: 0;
    padding: 0;
  }

  h2.goods_name {
    word-wrap: break-word;
  }

  #goods_list {
    background: #ccc;
  }

  img.thumb_nail {
    width: 100%;
    height: 50%;
  }

  #goods_list ul:after {
    content: "";
    clear: both;
    display: block;
  }

  #goods_list ul li {
    width: 250px;
    height: 500px;
    margin-left: 2.4%;
    margin-top: 30px;
    display: block;
    float: left;
    list-style-type: none;
    background: #0cc;
    text-align: center;
  }

</style>
