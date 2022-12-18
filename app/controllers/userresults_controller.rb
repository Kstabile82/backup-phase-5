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
        alreadyexists = Userresult.find_by(information_id: params[:testArr][0][:info_id])
        if alreadyexists
            ur = alreadyexists.update!(userrescue_id: params[:userrescue_id], information_id: params[:testArr][0][:info_id], score: score)
        else 
        ur = Userresult.create!(userrescue_id: params[:userrescue_id], information_id: params[:testArr][0][:info_id], score: score)
        end
        render json: ur
      end

      def destroy
        uR = Userrescue.find(params[:userrescue_id])
        if uR.status === "Admin"
            u = Userresult.find(params[:id])
            u.destroy
            render json: { message: "Deleted" }
        else 
            render json: { message: `You're not an admin for this rescue. Only admins are authorized to delete results.`}
      end
    end

    private 

    def userresults_params
        params.permit(:userrescue_id, :information_id, :score)
    end

end