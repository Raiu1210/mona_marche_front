<template>
  <div class="gooods_list">
    <!-- <h1>This is a goods list page</h1> -->
    <p>{{ mona_price }}</p>
    
    {{goods_list}}
    
  </div>
</template>

<script>
import axios from 'axios'
import Methods from '@/api/methods'

export default {
  name: 'goods_list',
  data() {
    return {
      mona_price: '111',
      goods_list:[],
      test: 'bbb'
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
