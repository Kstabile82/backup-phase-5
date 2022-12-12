class Userresult < ApplicationRecord
   validates :userrescue_id, presence: true
   validates :information_id, presence: true
   validates :score, presence: true
    belongs_to :userrescue
    belongs_to :information
end
