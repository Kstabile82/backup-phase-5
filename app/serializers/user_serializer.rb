class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :password
end
