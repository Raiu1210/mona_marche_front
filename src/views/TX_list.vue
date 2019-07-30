<template>
  <div class="tx_list">
    <ul class="from_me">
      <li v-for:>

      </li>
    </ul>

    <ul class="to_me">

    </ul>
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
  }
}
</script>
