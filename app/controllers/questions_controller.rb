class QuestionsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        qstn = Question.create!(question_params)
        render json: qstn, status: 200
    end
   
    def show
        q = Question.where(information_id: params[:information_id])
        render json: q, status: 200
    end
   
    def destroy
       q = Question.find(params[:id])
       q.destroy
    end
   
    def update
        q = Question.find(params[:id])
        q.update!(question_params)
        render json: q, status: 200
    end

    private

    def question_params
        params.permit(:information_id, :questiontext)

        # params.require(:question).permit(:information_id, :text)
    end
end
