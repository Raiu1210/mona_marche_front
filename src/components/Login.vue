<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <button @click='post'>Login</button>
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  name: 'HelloWorld',

  methods: {
    async post() {
      let response = await Methods.ask_verify_sig()
      console.log(response["data"]["message"])
      if(response["data"]["message"]) {
        alert("login success")
      } else {
        alert("login failed")
      }
    }
  }
}
</script>