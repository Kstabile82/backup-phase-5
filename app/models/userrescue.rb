class Userrescue < ApplicationRecord
    validates :user_id, presence: true
    validates :rescue_id, presence: true
    validates :status, presence: true
    belongs_to :user  
    belongs_to :rescue 
    has_many :userresults, dependent: :destroy
end
