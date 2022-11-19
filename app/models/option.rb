class Option < ApplicationRecord
    belongs_to :question
    validates :text, presence: :true, uniqueness: :true
    validates :question_id, presence: :true
end
