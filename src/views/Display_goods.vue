<template>
  <div class="display_goods">
    <br>
    <input class="goods_name" v-model="goods_name" placeholder="商品名を入力！"><br>
    <textarea class="goods_discription" v-model="discription" placeholder="商品の説明を書こう!"></textarea><br>
    <input class="contact" v-model="contact" placeholder="SNSなどの連絡先を入力しよう！"><br>
    <input class="price" v-model="price" placeholder="金額を入力しよう"><br>
    <select class="currency_tab" v-model="currency">
      <option disabled value="">通貨を選ぼう！</option>
      <option>MONA</option>
      <option>JPY</option>
    </select><br>
    <br><br>
    
    <label v-show="!uploadedImage" class="input-item_label">画像を選択
      <input type="file" @change="onFileChange" />
    </label>

    <div class="preview-item">
      <img v-show="uploadedImage" class="preview-item-file" :src="uploadedImage"/>
      <div v-show="uploadedImage" class="preview-item-btn" >
        <p class="preview-item-name">{{ img_name }}</p><br>
        <button clas="remove_img_button" @click="remove">画像を閉じる</button>
      </div>
    </div>

    <br><br>
    <input class="submit_button" type="submit" value="出品する" @click="submitClick">
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  name: 'Display_goods',
  data () {
    return {
      goods_name: '',
      discription: '',
      contact: '',
      price: '',
      currency: '',
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
      this.imageFile = null;
    },

    getDecimalPointLength(number) {
      var numbers = String(number).split('.');
  
      return (numbers[1]) ? numbers[1].length : 0;
    },

    async submitClick() {
      //check input
      try {
        if (this.goods_name.length == 0) { 
          throw new Error('商品名が入力されてないよ');
        } if (this.discription.length == 0) {
          throw new Error('商品説明が入力されてないよ');
        } else if (this.contact.length == 0) {
          throw new Error('連絡先が入力されてないよ');
        } else if (this.price.length == 0 || isNaN(this.price)) {
          throw new Error('金額設定がおかしいよ');
        } else if (this.getDecimalPointLength(this.price) > 8) {
          throw new Error('小数点以下は1億分の位までにしてね');
        } else if (this.currency != 'MONA' && this.currency != "JPY") {
          throw new Error('通貨選んだ？');
        } else if (this.imageFile == null) {
          throw new Error('画像が選択されてないよ');
        }

        const {address, message, signature, result} = await Methods.ask_verify_sig()
        if (result["data"]["message"]) {
          let response = await Methods.post_goods_info(
            address,
            message,
            signature,
            this.goods_name,
            this.discription,
            this.contact,
            this.price,
            this.currency,
            this.imageFile);
          this.clear_input()
        } else {
          alert("署名が不正です")
        }
        
      } catch (e) {
        alert(e.message);
      }
    },
    clear_input() {
      this.goods_name = '';
      this.discription = '';
      this.contact = '';
      this.price = '';
      this.currency = '';
      this.remove()
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
.currency_tab{
  margin-top: 20px;
  width: 200px;
  height: 50px;
  font-size: 20px;
}
.input-item_label{
  font-size: 1.4rem;
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #040708;
  border: solid 2px #2946c9;
  border-radius: 3px;
  transition: .4s;
}

.submit_button {
  width: 160px;
  height: 70px;
  font-size: 26px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  color: #ffffff;
  background-image: linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #c58668;
  margin-bottom: 200px;
}
.submit_button:active {
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-bottom: none;
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