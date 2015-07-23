class AddEndToPages < ActiveRecord::Migration
  def change
      add_column :pages, :end, :text
  end
end
