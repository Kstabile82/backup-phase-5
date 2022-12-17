class OptionsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  # before_action :authorize, only: [:create, :delete, :update]
  wrap_parameters format: [] 

    def show
        opt = []
        opt = Option.where(question_id: params[:id])
        if opt
            render json: opt, status: 200
        else
            render json: { message: "No options" }, status: :unauthorized
        end
      end
    
      def create
        corr = nil
        quest = Question.find(params[:question_id])
        corr = quest.options.find_by("correct" === true)
        if params[:correct] === true && corr != nil 
          render json: { message: "You already have a correct answer for this question, you must delete that one before you can add this as the answer." }, status: :unauthorized
        else 
          opt = Option.create!(option_params)
          render json: opt
        end
      end
    
      def destroy
        opt = Option.find(params[:id])
        opt.destroy
            render json: { message: "Deleted" }
          end
    
      private
      def option_params
        params.permit(:text, :question_id, :correct)
      end
end
