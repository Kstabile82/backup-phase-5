class ChangeInformationToInformations < ActiveRecord::Migration[7.0]
  def change
    rename_table :information, :informations

  end
end
