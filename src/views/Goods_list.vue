<template>
  <div class="gooods_list">
    <!-- <h1>This is a goods list page</h1> -->
    <p>{{ mona_price }}</p>
    <input class="submit_button" type="submit" value="出品する" @click="get_mona_price">
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
    }
  },
  methods: {
    async get_mona_price() {  
      const bitbank_api = "https://public.bitbank.cc/mona_jpy/transactions"
      let result = await axios.get(bitbank_api).then(response => (this.info = response))
      let mona_price = result["data"]["data"]["transactions"][0]["price"]
      this.mona_price = mona_price;

      console.log(this.mona_price)
      console.log(mona_price)
      console.log(typeof(mona_price))
    },
  }
}
</script>
