class QuestionsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize, only: [:create, :delete, :update]

    def index
        q = []
        q = Question.all
        render json: q
    end

    # def show
    #     q = []
    #     q = Question.where(information_id.to_i: params[:id])
    #     if q
    #         render json: q, status: 200
    #     else
    #         render json: { message: "No info" }, status: :unauthorized
    #     end
    #   end
    
      def create
       q = Question.create(question_params)
        render json: q
      end

      def update
        q = Question.find(params[:id])
        q.update(question_params)
        render json: q
    end
    
      def destroy
        q = Question.find(params[:id])
        q.destroy
            render json: { message: "Deleted" }
          end
    
      private
      def question_params
        params.permit(:text, :information_id, :idx)
      end
end
