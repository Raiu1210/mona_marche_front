import Api from './index'

export default {
  async ask_verify_sig () {
    var date = new Date();
    var a = date.getTime();
    let address = await window.mpurse.getAddress();

    var message = "Please sign this message :" + a
    var signature = await window.mpurse.signMessage(message);

    const item = { address: address, message: message, signature: signature }
    const result = await Api().post('/verify', item)

    return {address, message, signature, result}
  },

  async post_goods_info(address, message, signature, goods_name, discription, contact, price, currency, imageFile) {
    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("message", message);
      formData.append("signature", signature);
      formData.append("goods_name", goods_name);
      formData.append("discription", discription);
      formData.append("contact", contact);
      formData.append("price", price);
      formData.append("currency", currency);
      formData.append("file", imageFile[0]);

      // console.log(formData.get('goods_name'));

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
  },

  async get_goods_list() {
    let res = await Api().get("/goods_list");
    
    return res;
  },

  async get_goods_info(id) {
    let res = await Api().get("/goods_detail?id=" + id);

    return res
  }
}
