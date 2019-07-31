<template>
  <div id="my_goods_list">
    <ul>
      <li v-for="{id, goods_name, contact, price, currency, image_path} in reverseItems" :key="id">
        <router-link class="my_goods_link" :to="`/my_goods_list/${ id }`">
          <div class="goods_link">
            <img class="my_goods_img" :src="`https://localhost:3000/${image_path}`"><br><br>
            <h2 class="goods_name">{{ goods_name }}</h2><br><br>
            <h4>出品者 {{contact}}</h4><br>
            <h4 v-if="currency == 'JPY'">{{price / mona_price}} MONA</h4>
            <h4 v-else>{{price}} MONA</h4>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from 'axios'
import Methods from '@/api/methods'

export default {
  name: 'my_goods_list',
  data() {
    return {
      mona_price: 1,
      my_goods_list:[],
    }
  },
  created() {
    this.get_mona_price()
    Methods.ask_my_goods_list().then(value => {
      console.log(value["data"])
      this.my_goods_list = value["data"]
    });
  },
  methods: {
    async get_mona_price() {  
      const bitbank_api = "https://public.bitbank.cc/mona_jpy/transactions"
      let result = await axios.get(bitbank_api).then(response => (this.info = response))
      let mona_price = result["data"]["data"]["transactions"][0]["price"]
      this.mona_price = mona_price;
    },
  },
  computed: {
    reverseItems() {
        return this.my_goods_list.slice().reverse();
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

  img.my_goods_img {
    width: 100%;
    height: 40%;
  }

  #my_goods_list ul:after {
    content: "";
    clear: both;
    display: block;
  }

  .my_goods_link {
    text-decoration: none;
    width: 250px;
    height: 500px;
  }
  .my_goods_link:link { 
    color : #000000; 
  }
  .my_goods_link:hover{
    color : #f68504;
  }
  .my_goods_link:visited { 
    color : #000000; 
  }

  #my_goods_list ul li {
    width: 250px;
    height: 500px;
    margin-left: 2.4%;
    margin-top: 30px;
    display: block;
    float: left;
    border: 1px solid #006666;
    list-style-type: none;
    text-align: center;
  }

</style>