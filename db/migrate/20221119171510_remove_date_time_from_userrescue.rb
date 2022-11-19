class RemoveDateTimeFromUserrescue < ActiveRecord::Migration[7.0]
  def change
    remove_column :userrescues, :datetime
  end
end
