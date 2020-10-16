function check() {
  const posts = document.querySelectorAll(".post"); //これでpostとついたクラス名全てを取得できる
  posts.forEach(function (post) {                  //これでツイートごとに以下のイベントが起こるようになった
    if (post.getAttribute("data-load") != null) {  //最初の処理では"data-load"という記述はないのでこれは実行されない、
       return null;                                //ifの内容は空が返ってくるので一度チェックした(既読した)物は、もう実行されなくなる
     }                                             //この処理はetInterval(check, 1000)で何回も実行される
                                                   //2回目以降の処理では↓の処理で"data-load"が追加されている、これでdata-loadの中身があるのでif文が実行される
                                                  //ifの内容は空が返ってくるので一度チェックした(既読した)物は、もう実行されなくなる

    post.setAttribute("data-load", "true");       //これでhtmlのpost要素に"data-load"という属性にtrueという値がついた、
    post.addEventListener("click", () => {        //要素1つずつに対して、『クリック』した際に動作するイベント駆動
                                                  // ここよりしたにクリックした時に行う「何らかの処理」を記述していく
      const postId = post.getAttribute("data-id"); //このpostはhtmlで決めたやつ、getAttributeでdata-idの属性値を取得
      const XHR = new XMLHttpRequest();           //XHRは変数名、newはHTTPメソッド、これで非同期通信を行うためのオブジェクトが出来た
      XHR.open("GET", `/posts/${postId}`, true); 
                                                  // /posts/はroutesで見れるurlパターンにある、今回はcheckedを見れば良い
                                                  //${postId}はpost.getAttributeで決めた変数名、今回でいうならツイートごとのidを指定する、非同期通信なので画面は同じ
                                                  //${postId}なのはrybyの＃{}と同じでjavaで変数名を使う場合はこのかっこが必要
      XHR.responseType = "json";                   //これで非同期通信のレスポンス形式をjson形式に出来た
      XHR.send();                                 //上で設定した内容をサーバーに送る
      XHR.onload = () => {                       //上記の内容がうまく行った場合下記の設定が動くということ
        if (XHR.status != 200) {                 //!=はそれ以外という意味、今回はステータスコードが200以外場合はという意味
          alert(`Error ${XHR.status}: ${XHR.statusText}`);  //これは200以外が出た場合エラーメッセージが出るということ
  　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//${XHR.status}でステータスコードの数字が出る        ${XHR.statusText}これでそのステータスコードの処理内容が出てくる
          return null;                            //これをすることでエラーが出た場合、これより下の物は実行されないと出る
        }
        const item = XHR.response.post;  　　　　　　　　//このpostはコントローラーのpost、これで取得したidは全てjson形式で返される
        if (item.checked === true) {                 //あとで聞く
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000); //これでfunction checkの中身が１秒ごとに実行されるようになった
window.addEventListener("load", check);
