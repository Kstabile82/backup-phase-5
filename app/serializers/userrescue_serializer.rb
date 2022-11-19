class UserrescueSerializer < ActiveModel::Serializer
  attributes :id, :rescue_id, :user_id, :status, :datetime
end
