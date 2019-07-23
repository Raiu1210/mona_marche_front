import Api from './index'

export default {
  async ask_verify_sig () {
    var date = new Date();
    var a = date.getTime();

    var address = await window.mpurse.getAddress()
    var message = "Please sign this message :" + a
    var signature = await window.mpurse.signMessage(message);

    const item = { address: address, message: message, signature: signature }
    return Api().post('/verify', item)
  },

  async post_goods_info(goods_name, discription, contact, price, address, imageFile) {
    try {
      const formData = new FormData();
      formData.append("goods_name", goods_name);
      formData.append("discription", discription);
      formData.append("contact", contact);
      formData.append("price", price);
      formData.append("address", address);
      formData.append("file", imageFile[0]);

      console.log(formData.get('goods_name'));

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        }
      };
      let res = await Api().post("/image", formData, config);
      console.log(res);
      if (res.data.status === "error") {
        alert(res.data.error);
      } else {
        alert("登録完了したよ！")
      }
    } catch (error) {
      alert("商品の登録に失敗しちゃった orz\nもう一度やってみて！");
    }
  }
}
