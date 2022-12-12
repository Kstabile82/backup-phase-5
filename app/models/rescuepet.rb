class Rescuepet < ApplicationRecord
   validates :rescue_id, presence: true
   validates :animal, presence: true
   validates :name, presence: true
   validates :age, presence: true
    belongs_to :rescue
end
