class UserrescueSerializer < ActiveModel::Serializer
  attributes :id, :status, :rescue
  belongs_to :rescue, useSerializer: RescueSerializer 
end
