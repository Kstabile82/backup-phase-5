class Userresult < ApplicationRecord
    belongs_to :userrescue, dependent: :destroy
    belongs_to :information, dependent: :destroy
end
