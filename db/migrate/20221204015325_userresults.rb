class Userresults < ActiveRecord::Migration[7.0]
  def change
    create_table :userresults do |t|
    t.integer :information_id
    t.integer :userrescue_id
    t.integer :score
    end

  end
end
