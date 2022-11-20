class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :userrescues
  has_many :userrescues
  has_many :userresults

end
