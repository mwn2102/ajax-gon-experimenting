class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.text :name
      t.integer :score
      t.timestamps null: false
    end
  end
end
