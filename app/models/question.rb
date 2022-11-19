class Question < ApplicationRecord
    belongs_to :information
    has_many :options, dependent: :destroy
    validates :questiontext, presence: true, uniqueness: true, length: { minimum: 5}
    validates :information_id, presence: true
end
