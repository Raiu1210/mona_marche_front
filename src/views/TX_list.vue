<template>
    <div class="tx_from_me_list">
        {{ tx_from_me_list }}
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
        console.log(value["data"])
        this.tx_from_me_list = value["data"]
    })
  }
}
</script>
