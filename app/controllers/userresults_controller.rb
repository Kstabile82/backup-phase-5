class UserresultsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize, only: [:delete, :update]
  
    # def show
    #     ur = Userresult.where(information_id: params[:information_id].to_i && user_id: params[:userrescue][:user_id].to_i)
    #     if ur
    #         render json: ur, status: 200
    #     else
    #         render json: { message: "No info" }, status: :unauthorized
    #     end
    # end
  
      def create
        arr = params[:testArr]
        score = 0; 
        inp = params[:testArr].map do |t| 
            if t[:input] == t[:answer] 
                score = score + 1
            else 
                score = score
            end
        end
        alreadyexists = Userresult.find_by(information_id: params[:testArr][0][:infoId].to_i)
        if alreadyexists
            ur = alreadyexists.update(userrescue_id: params[:userrescue_id].to_i, information_id: params[:testArr][0][:infoId].to_i, score: score)
        else 
        ur = Userresult.create(userrescue_id: params[:userrescue_id].to_i, information_id: params[:testArr][0][:infoId].to_i, score: score)
        end
        render json: ur
      end

    #   def destroy
    #         u = Userresult.find_by(information_id: params[:testArr][0][:infoId].to_i && userrescue_id: params[:userrescue_id].to_i)
    #         u.destroy
    #         render json: { message: "Deleted" }
    #   end

    private 

    def userresults_params
        params.permit(:userrescue_id, :information_id, :score)
    end

end