class DropOptionsTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :options
  end
end
