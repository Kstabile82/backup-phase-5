class OptionSerializer < ActiveModel::Serializer
  attributes :id, :question_id, :correct, :text
end
