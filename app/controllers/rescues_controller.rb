class RescuesController < ApplicationController
    # rescue ActiveRecord::RecordInvalid => invalid
#     render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  
def index
    rescs = Rescue.all
    render json: rescs
end

# def nonUserRescues
#     nurs = Rescue.filter(r => !@currentuser.Userrescues.includes(r))
#     render json: nurs
# end

def create    
    resc = Rescue.create!(rescue_params)
    # if resc 
    #    uR = UserRescue.create!(rescue_id: resc.id, user_id: user.id, status: "Admin")
    #     render json: uR, status: :created
    # end
        # if resc 
    #     redirect_to params[:redirect_to] || '/userrescues'
    # end
    render json: resc, status: :created
end

private

def rescue_params
    params.permit(:name, :location)
end
end
