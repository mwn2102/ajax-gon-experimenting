class ChangeCoordsTypeInPages < ActiveRecord::Migration
  def change
      change_column :pages, :coords, :text
  end
end
