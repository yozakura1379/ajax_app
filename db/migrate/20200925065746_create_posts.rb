class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
      t.boolean :checked #このbooleanという型はtrueか fulesを返す、これの動作をクリックにすればクリックしたら動作が働くようになる
      t.timestamps
    end
  end
end
