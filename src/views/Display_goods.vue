<template>
  <div class="display_goods">
    <input class="goods_name" v-model="goods_name" placeholder="商品名を入力！"><br>
    <textarea class="goods_discription" v-model="message" placeholder="商品の説明を書こう!"></textarea><br>
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

    <p class="displayer_info">goods_name: {{ goods_name }}</p>
    <p class="displayer_info">message: {{ message }}</p>
    <p class="displayer_info">contact: {{ contact }}</p>
    <p class="displayer_info">contact: {{ price }}</p>
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
      price: '',
      uploadedImage: '',
      img_name: '',
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      // 拡張子で分ける（※.が1つの想定です）
      const imgNameExe = files[0].name.split('.');

      // 拡張子から前
      let imgName = imgNameExe[0];

      // 拡張子から後ろ
      const imgExe = imgNameExe[1];

      // 表示したいMaxのByte数（全角10文字、半角20文字）
      const maxBytes = 20;
      const imgNameBytes = encodeURIComponent(imgName).replace(/%../g, 'x').length;

      // 画像ファイルとMax Byte数の比較
      if (imgNameBytes > maxBytes) {
        const zenkaku = imgNameBytes - imgName.length;
        if (zenkaku > 0) {
          imgName = imgName.slice(0, maxBytes / 2 - imgName.length) + '..';
        } else {
          imgName = imgName.slice(0, maxBytes - imgNameBytes) + '..';
        }
      }

      // 短くカットしたものと.と拡張子の文字列の連結
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