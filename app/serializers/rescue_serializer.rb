class RescueSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :userrescues, :rescuepets
  has_many :userrescues
  # has_many :rescuepets, useSerializer: RescuePetSerializer
end
