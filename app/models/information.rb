class Information < ApplicationRecord
    belongs_to :rescue
    has_many :questions
    has_many :options, through: :questions 
end
