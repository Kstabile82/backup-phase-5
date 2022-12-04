class AddNameToRescuepet < ActiveRecord::Migration[7.0]
  def change
    add_column :rescuepets, :name, :string
  end
end
