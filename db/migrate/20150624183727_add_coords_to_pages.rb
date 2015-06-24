class AddCoordsToPages < ActiveRecord::Migration
  def change
    add_column :pages, :coords, :float
  end
end
