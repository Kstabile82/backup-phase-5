class User < ApplicationRecord
    has_secure_password
    validates :name, presence: :true
    validates :name, uniqueness: :true
    has_many :userrescues, dependent: :destroy
    has_many :rescues, through: :userrescues
    has_many :userresults, dependent: :destroy
end
