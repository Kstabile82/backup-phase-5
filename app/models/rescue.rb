class Rescue < ApplicationRecord
    validates :name, presence: true
    validates :location, presence: true
    has_many :userrescues, dependent: :destroy
    has_many :information, dependent: :destroy
    has_many :users, through: :userrescues
    has_many :rescuepets, dependent: :destroy
    has_many :questions, through: :information
    has_many :options, through: :questions 
    # has_many :questions, through: :informations
    # has_many :options, through: :questions 
    # validates :name, presence: :true
    # validates :name, uniqueness: :true
end
