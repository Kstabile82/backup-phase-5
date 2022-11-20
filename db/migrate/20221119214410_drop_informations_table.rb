class DropInformationsTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :informations
  end
end
