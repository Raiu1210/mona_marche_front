<template>
  <div id="goods_list">
    <button class="pre_button_top" v-on:click="page -= 1" v-show="page > 0"> ← 前へ</button>
    <p class="page_preview_top">ページ {{page+1}}</p>
    <button class="next_button_top" v-on:click="page += 1" v-show="ppc*page+ppc < reverseItems.length">次へ →</button>

    <ul>
      <li v-for="{id, goods_name, contact, price, amount, currency, image_path} in reverseItems.slice(ppc*page, ppc*page+ppc)" :key="id">
        <router-link class="goods_link" :to="`/goods_list/${ id }`">
          <div class="goods_link">
            <img class="thumb_nail" :src="`https://localhost:3000${image_path}`"><br><br>
            <h2 class="goods_name">{{ goods_name }}</h2><br><br>
            <h4>出品者 {{contact}}</h4><br>
            <h4 v-if="currency == 'JPY'">{{ Math.round((price / mona_price) * 100000000) / 100000000 }} MONA</h4>
            <h4 v-else>{{price}} MONA</h4><br><br><br>

            <h4 v-if="amount > 0">在庫数 : {{amount}}</h4>
            <h4 class="sold" v-else>在庫切れ</h4>
          </div>
        </router-link>
      </li>
    </ul>

    <button class="pre_button_bottom" v-on:click="page -= 1" v-show="page > 0"> ← 前へ</button>
    <p class="page_preview_bottom">ページ {{page+1}}</p>
    <button class="next_button_bottom" v-on:click="page += 1" v-show="ppc*page+ppc < reverseItems.length">次へ →</button>
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
      page: 0,
      ppc: 30, // page per contents
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
      Methods.get_goods_list().then(value => {
        this.goods_list = value["data"]
      });
    },
  },
  computed: {
    reverseItems() {
      return this.goods_list.slice().reverse();
    },
  }
}
</script>


<style>
  h2.goods_name {
    word-wrap: break-word;
  }

  #goods_list {
    /* background: #ccc; */
  }

  img.thumb_nail {
    width: 100%;
    height: 40%;
  }

  #goods_list ul:after {
    content: "";
    clear: both;
    display: block;
  }

  .goods_link {
    text-decoration: none;
    width: 250px;
    height: 500px;
  }
  .goods_link:link { 
    color : #000000; 
  }
  .goods_link:hover{
    color : #f68504;
  }
  .goods_link:visited { 
    color : #000000; 
  }
  .sold {
    color: #ff0000;
  }

  #goods_list ul li {
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

  .pre_button_top {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #FFF;
    background: #00bcd4;
    transition: .4s;
    display: inline-block;
  }

  .next_button_top {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #FFF;
    background: #00bcd4;
    transition: .4s;
    display: inline-block;
  }

  .page_preview_top {
    display: inline-block;
    margin-left: 50px;
    margin-right: 50px;
  }


  .pre_button_bottom {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #FFF;
    background: #00bcd4;
    transition: .4s;
    display: inline-block;
  }

  .next_button_bottom {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #FFF;
    background: #00bcd4;
    transition: .4s;
    display: inline-block;
  }

  .page_preview_bottom {
    display: inline-block;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
  }

</style>
