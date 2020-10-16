class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end
  def create
    post = Post.create(content: params[:content], checked: false) #このチェックをfalseにしないと既読状態で送られてしまう
    render json:{ post: post }      #これをすることでcreateは非同期通信を行えるようになった
  end
  def checked
    post = Post.find(params[:id])   #あとで聞く
    if post.checked
      post.update(checked: false) 
    else
      post.update(checked: true)
    end
    item = Post.find(params[:id]) #これはid取得した時、取得した情報は全てjson形式で返すという意味、これがないとjavaのファイルが実行されない
    render json: { post: item }  #renderは返すという意味、postにitemを代入したようなもの、実際はハッシュの属性と値の関係
  end

end