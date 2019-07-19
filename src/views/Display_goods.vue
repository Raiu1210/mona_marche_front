<template>
  <div class="display_goods">
    <input class="goods_name" v-model="goods_name" placeholder="商品名を入力！"><br>
    <textarea class="goods_discription" v-model="message" placeholder="商品の説明を書こう!"></textarea><br>
    <input class="contact" v-model="contact" placeholder="SNSなどの連絡先を入力しよう！"><br><br>
    <label class="input-item_label">画像を選択<input type="file" v-on:change="handleChange"/></label>

    <p class="displayer_info">goods_name: {{ goods_name }}</p>
    <p class="displayer_info">message: {{ message }}</p>
    <p class="displayer_info">contact: {{ contact }}</p>
  </div>
</template>

<script>
export default {
  name: 'goods_name',
  data () {
    return {
      goods_name: '',
      message: '',
      contact: '',
    }
  },
}
</script>


<style scoped>
.display_goods{
  font-size: 1.4rem;
  text-align: center;
}
.goods_name{
  width: 70%;
  height:30pt;
  font-size: 1.5em;
}
.goods_discription{
  width: 70%;
  height:300pt;
  margin-top: 20px;
  font-size: 0.8em;
}
.contact{
  width: 70%;
  height:30pt;
  font-size: 1.0em;
}
.input-item_label{
  font-size: 1.0rem;
}
.button {
  display: block;
  position: relative;
  margin: 0 auto;
  width: 70pt;
  border: solid 1px silver;
  border-radius: 0.5rem 0.5rem;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  text-decoration: none;
}

label > input {
  display: none;
}

label {
  padding: 0 1rem;
  border: solid 1px #888;
} 

label::after {
  content: '+';
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>