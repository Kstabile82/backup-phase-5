class UserrescueSerializer < ActiveModel::Serializer
  attributes :id, :status, :rescue, :user
  belongs_to :rescue, useSerializer: RescueSerializer 
  belongs_to :user, useSerializer: UserSerializer
end
