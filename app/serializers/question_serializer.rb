class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :information_id, :idx, :text, :options
  has_many :options
end
