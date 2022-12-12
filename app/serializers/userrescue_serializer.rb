class UserrescueSerializer < ActiveModel::Serializer
  attributes :id, :status, :rescue, :user, :userresults
  belongs_to :rescue, useSerializer: RescueSerializer 
  belongs_to :user, useSerializer: UserSerializer
  has_many :userresults
end
