class AddStartToPages < ActiveRecord::Migration
  def change
    add_column :pages, :start, :text
  end
end
