Rails.application.routes.draw do
  root to: 'posts#index' 
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked' #これでpostモデルのcheckedの情報を取得できるようになった、checkedの詳細はdb→migrate→のファイルを参照
end

