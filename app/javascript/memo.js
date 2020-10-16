function memo() {
  const submit = document.getElementById("submit");  
  submit.addEventListener("click", (e) => {  //このeはsubmit.addEventListenerの変数名
    const formData = new FormData(document.getElementById("form"));  //これでid:formに書かれた値を入手できる
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);                                             //送るのはformDateで入手した値、要はtext
    XHR.onload = () => {                                           
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;   　　　　　　　　　　　　　　　　//このpostはコントローラーのpost、これで取得したidは全てjson形式で返される
      const list = document.getElementById("list");
      const formText = document.getElementById("content");  　　　　//formTextを取得する理由は、メモの入力フォームをリセットするためです。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要があります
                                       
      const HTML = `                                              
        <div class="post" data-id=${item.id}>                    
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        //const HTMLは変数名
        //${item.id}などはのidはツイートごとにあるテーブルのidのナンバー
        list.insertAdjacentHTML("afterend", HTML);           //ここで上記で設定したlistの内容が出来た、afterendの場所はindexの<% @posts.each do |post| %>の前、つまり新規投稿はこれから一番上にくるようになった
                                                              //これで非同期通信での投稿ができるようになった
      formText.value = "";                                    //これで上で定義したformTextの内容を空白にする
    };
    e.preventDefault();  //このeは３行目に設定したやつ、つまり送信ボタンをクリックするたびにこのpreventDefaultが起きるということ
                         //preventDefault();は標準設定を止めるメソッド、今回でいう標準設定なら送信ボタンを押すと画面が転移するという物
                         //今回は非同期通信でやるため移動が邪魔なので、このメソッドを入れた、
                         //これをしないとcrateアクションとjavaの投稿で二重に投稿されてしまう、なのでjavaの方を止めて２重を阻止した
    });
}







window.addEventListener("load", memo);

