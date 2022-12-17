class Information < ApplicationRecord
   validates :text, presence: true
   validates :title, presence: true
    validates :rescue_id, presence: true
    belongs_to :rescue
    has_many :questions
    has_many :userresults
    has_many :options, through: :questions 

end
