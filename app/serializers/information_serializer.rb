class InformationSerializer < ActiveModel::Serializer
  attributes :id, :rescue_id, :title, :text, :questions
  has_many :questions, useSerializer: QuestionSerializer
end
