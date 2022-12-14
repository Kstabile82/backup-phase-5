class RescuesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize, only: [:delete, :update]
  
def index
    rescs = Rescue.all
    render json: rescs
end

def create    
    resc = Rescue.create!(rescue_params)
    render json: resc, status: :created
end

def update
   @current_user = User.find_by(id: session[:user_id])
   r = Rescue.find(params[:id]) 
   admins = Userrescue.where(status: "Admin") 
   admins = admins.where(rescue_id: r.id).map { |ur| ur.user }
   if admins.include?@current_user 
    r.update(rescue_params)
    render json: r
   else 
    render json: { message: `You're not an admin for #{r}. Only admins can make updates.`}
   end
end

def destroy
   @current_user = User.find_by(id: session[:user_id])
   r = Rescue.find(params[:id]) 
   admins = Userrescue.where(status: "Admin") 
   admins = admins.where(rescue_id: r.id).map { |ur| ur.user }
   admins.include?@current_user 
end

private

def rescue_params
    params.permit(:name, :location)
end
end
