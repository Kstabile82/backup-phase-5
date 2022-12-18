class AddMaxscoreToUserresults < ActiveRecord::Migration[7.0]
  def change
    add_column :userresults, :maxscore, :integer
  end
end
