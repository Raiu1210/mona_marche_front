<template>
  <div class="tx_list">
    <h2 class="title_label">あなた宛のTX</h2>
    <table class="tx_to_me_table" border="1">
      <tr>
        <th>タイムスタンプ</th>
        <th>金額</th>
        <th>tx_hash</th>
        <th>リンク</th>
      </tr>
      <tr v-for="{timestamp, price, tx_hash } in reverse_tx_to_me" :key="timestamp">
        <td class="data">{{timestamp}}</td>
        <td class="data">{{price}}</td>
        <td class="data">{{tx_hash}}</td>
        <td class="data"><a target="_blank" :href="`https://blockbook.electrum-mona.org/tx/${tx_hash}`">詳細</a></td>
      </tr>
    </table><br><br>

    <h2 class="title_label">あなたが送ったTX</h2>
    <table class="tx_from_me_table" border="1" bordercolor="black">
      <tr>
        <th>タイムスタンプ</th>
        <th>金額</th>
        <th>tx_hash</th>
        <th>リンク</th>
      </tr>
      <tr v-for="{timestamp, price, tx_hash } in reverse_tx_from_me" :key="timestamp">
        <td class="data">{{timestamp}}</td>
        <td class="data">{{price}}</td>
        <td class="data">{{tx_hash}}</td>
        <td class="data"><a target="_blank" :href="`https://blockbook.electrum-mona.org/tx/${tx_hash}`">詳細</a></td>
      </tr>
    </table>
  </div>
</template>


<script>
import Methods from '@/api/methods'

export default {
  data() {
    return {
      tx_from_me_list: [],
      tx_to_me_list: []
    }
  },
  created() {
    Methods.ask_tx_from_me_list().then(value => {
        this.tx_from_me_list = value["data"]
    })
    Methods.ask_tx_to_me_list().then(value => {
        console.log(value["data"])
        this.tx_to_me_list = value["data"]
    })
  },
  computed: {
    reverse_tx_to_me() {
      return this.tx_to_me_list.slice().reverse();
    },
    reverse_tx_from_me() {
      return this.tx_from_me_list.slice().reverse();
    },
  }
}
</script>


<style>
.tx_to_me_table {
  margin: auto;
}

.tx_from_me_table {
  margin: auto;
}

.data {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
