class RescuepetSerializer < ActiveModel::Serializer
  attributes :id, :rescue_id, :animal, :breed, :size, :age, :name
end
