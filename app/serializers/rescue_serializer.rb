class RescueSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :userrescues, :rescuepets, :information
  has_many :userrescues
  has_many :information, useSerializer: InformationSerializer
  # has_many :rescuepets, useSerializer: RescuePetSerializer
end
