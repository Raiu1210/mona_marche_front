<template>
  <div class="display_goods">
    <br>
    <input class="goods_name" v-model="goods_name" placeholder="商品名を入力！"><br>
    <textarea class="goods_discription" v-model="discription" placeholder="商品の説明を書こう!"></textarea><br>
    <input class="contact" v-model="contact" placeholder="SNSなどの連絡先を入力しよう！"><br>
    <input class="price" v-model="price" placeholder="金額をMONAで入力しよう（JPY対応はもうちょっと待ってね！)"><br><br>
    
    <label v-show="!uploadedImage" class="input-item__label">画像を選択
      <input type="file" @change="onFileChange" />
    </label>

    <div class="preview-item">
      <img
        v-show="uploadedImage"
        class="preview-item-file"
        :src="uploadedImage"
        alt=""
      />
      <div v-show="uploadedImage" class="preview-item-btn" @click="remove">
        <p class="preview-item-name">{{ img_name }}</p>
        <e-icon class="preview-item-icon">close</e-icon>
      </div>
    </div>

    <br><br>
    <input type="submit" value="出品する" @click="submitClick">

    <!-- <form>
      <input type="file" id="file" v-on:change="onFileChange">
      <input type="submit" value="decide" @click="submitClick">
    </form> -->

    <!-- <p class="displayer_info">goods_name: {{ goods_name }}</p> -->
    <p class="displayer_info">discription: {{ discription }}</p>
    <!-- <p class="displayer_info">contact: {{ contact }}</p> -->
    <!-- <p class="displayer_info">contact: {{ price }}</p> -->
  </div>
</template>

<script>
import Axios from "axios";
import Methods from '@/api/methods'

export default {
  name: 'goods_name',
  data () {
    return {
      goods_name: '',
      discription: '',
      contact: '',
      price: '',
      uploadedImage: '',
      img_name: '',

      imageFile: null
    }
  },
  methods: {
    onFileChange(e) {
      this.imageFile = e.target.files || e.dataTransfer.files;
      this.createImage(this.imageFile[0]);
      const imgNameExe = this.imageFile[0].name.split('.');

      let imgName = imgNameExe[0];
      const imgExe = imgNameExe[1];

      const maxBytes = 20;
      const imgNameBytes = encodeURIComponent(imgName).replace(/%../g, 'x').length;

      if (imgNameBytes > maxBytes) {
        const zenkaku = imgNameBytes - imgName.length;
        if (zenkaku > 0) {
          imgName = imgName.slice(0, maxBytes / 2 - imgName.length) + '..';
        } else {
          imgName = imgName.slice(0, maxBytes - imgNameBytes) + '..';
        }
      }

      imgName = imgName + '.' + imgExe;
      this.img_name = imgName;
    },

    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.uploadedImage = false;
    },

    async submitClick() {
      let address = await window.mpurse.getAddress();
      if (this.goods_name.length == 0) {
        alert("商品の名前が入力されてないよ！");
        exit(1);
      } else if (this.goods_name.discription == 0) {
        alert("商品の説明が入力されてないよ！");
        exit(1);
      } else if (this.goods_name.contact == 0) {
        alert("連絡先が入力されていないよ!");
        exit(1);
      }

      alert(address)

      // let address = await window.mpurse.getAddress();
      // let response = await Methods.post_goods_info(this.imageFile)
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
  margin-top: 20px;
}
.price{
  width: 70%;
  height:30pt;
  font-size: 1.0em;
  margin-top: 10px;
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

.preview-item-file {
  width: 500px;
  height: 500px;
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