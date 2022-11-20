class DropUserResultsTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :userresults
  end
end
