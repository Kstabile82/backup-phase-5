class RescueSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :userrescues
  has_many :userrescues
end
