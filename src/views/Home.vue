<template>
  <div class="home">
    <div class="discription">
      <h2>モナマルシェについて</h2><br>
      <p>モナマルシェはログイン不要でモナコインで買い物ができるサービスだよ!</p>
      <p>現状、Web版のみ対応してるよ（Chrome & Firefox）</p>
      <p>サービス利用にあたって、mpurseが必要だよ!</p>
      <p>まだmpurseをインストールしていない人は下のリンクから飛んでね！</p><br>
      <li><a target="_blank" href="https://chrome.google.com/webstore/detail/mpurse/ljkohnccmlcpleonoiabgfggnhpkihaa?hl=en">Chromeを利用の方はこちら</a></li>
      <li><a target="_blank" href="https://addons.mozilla.org/ja/firefox/addon/mpchain_mpurse/">Firefoxを利用の方はこちら</a></li><br><br>
    </div>

    <div class="how_to_use">
      <h1 class="title">モナマルシェの使い方</h1>
      <h2>前提：Don't trust, verify</h2>

      <h2 class="how_to_content">出品するとき</h2>
      <p class="how_to_text">フォームに従って入力していこう！</p>
      <p class="how_to_text">連絡先はSNS(Twitter, facebook, etc)など、自分の普段の活動とかがわかる物が望ましいよ。なるべく購入者に信用してもらえるな何かをここで示そう!</p>
      <p class="how_to_text">通貨を選択するところで”JPY”を選択すると、bitbankのapiから直近の約定情報から取引価格を取得してきて、動的にMONAの値段に計算して表示するようになるよ。</p>
      <p class="how_to_text">それ以外は特に複雑なことは無いはず。わからないことあったら管理人まで連絡してきてね！</p><br><br>

      <h2 class="how_to_content">購入するとき</h2>
      <p class="how_to_text">このサービスは、出品者と購入者のマッチングをするサービスだよ。商品を預かったりしていないし、決済システムを提供してるわけでもない。支払いはモナコインブロックチェーンに流されるTXなので、一度払ってしまうと払い戻しすることは確率的にほぼ不可能だとおもう（ブロック巻き戻しや、モナコインをもらった人が返してくれるくらいしか方法が無いよ）。</p>
      <p class="how_to_text">だから以下のことをしっかり確認したうえで購入（支払い）をしよう！　俺と約束だ！</p><br>
      
      <li class="check_list">購入前に出品者と連絡を取る</li>
      <p class="check_list_detail">さっき説明した通り、一度送金してしまうと払い戻しはとても困難だ！　だから購入前に出品者と連絡することを徹底してほしい。連絡先の情報をみて信用できそうか自分の責任で確認してね！</p>
      <p class="check_list_detail">SNSアカウントだったら、明らかにさっき作った捨てアカっぽい雰囲気だと怪しいよね。タイムラインやDMの内容とかで信用できそうか見極めよう。</p><br>
      
      <h2 class="last_message">さあ、楽しい市場（marché）をみんなで作ろう！</h2>
    </div>
  </div>
</template>


<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Mona marche!'
    }
  },
}
</script>


<style>
  .how_to_use {
    margin: auto;
    margin-bottom: 200px;
    width: 80%;
    border: 1px solid #006666;
  }

  .title {
    margin-top: 10px;
  }

  .how_to_content {
    text-align: left;
    margin-left: 30px;
  }

  .how_to_text {
    text-align: left;
    margin-left: 50px;
    margin-right: 50px;
  }

  .check_list {
    text-align: left;
    margin-left: 70px;
    margin-right: 50px;
  }

  .check_list_detail {
    text-align: left;
    margin-left: 70px;
    margin-right: 50px;
  }
  
  .last_message {
    margin-bottom: 50px;
  }
</style>

