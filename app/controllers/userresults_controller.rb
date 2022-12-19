class UserresultsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize, only: :delete

      def create
        arr = params[:testArr]
        score = 0; 
        inp = params[:testArr].map do |t| 
            if t[:input] == t[:correct_answer] 
                score = score + 1
            else 
                score = score
            end
        end
        ur = Userresult.create!(userrescue_id: params[:userrescue_id], information_id: params[:testArr][0][:info_id], score: score, maxscore: params[:corr])
        if ur
            render json: ur
        else 
            render json: { message: `We couldn't save your results.` }
        end
      end

      def update
        arr = params[:testArr]
        score = 0; 
        inp = params[:testArr].map do |t| 
            if t[:input] == t[:correct_answer] 
                score = score + 1
            else 
                score = score
            end
        end
        ur = Userresult.update!(userrescue_id: params[:userrescue_id], information_id: params[:testArr][0][:info_id], score: score, maxscore: params[:corr])
        if ur
            render json: ur
        else 
            render json: { message: `We couldn't update your results.` }
        end
      end

      def destroy
        uR = Userresult.find(params[:id])
        uR.destroy
        render json: { message: "Deleted" }
    end

    private 

    def userresults_params
        params.permit(:userrescue_id, :information_id, :score, :maxscore)
    end

end