class Question < ApplicationRecord
   validates :text, presence: true 
   validates :information_id, presence: true
    belongs_to :information 
    has_many :options
end
