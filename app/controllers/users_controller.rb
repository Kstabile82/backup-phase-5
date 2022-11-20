class UsersController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users 
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: 200
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: 200, include: ['userrescues']
            # render json: user, include: ['rescues']
        else
            render json: { message: "Not logged in" }, status: :unauthorized
        end
    end

    def update
       user = User.find(params[:id])
       user(id: session[:user_id])
        if user
            updatedUser = user.update(user_params)
            render json: updatedUser
            # render json: user
        else
            render json: { message: "Not logged in" }, status: :unauthorized
        end
    end

    # def destroy
    #     find_user(params[:id])
    #     user.destroy
    #     session[:user_id] = nil
    # end

    def destroy
        user = User.find(params[:id])
        # resc = []
        admin = user.userrescues.find_by(status: "Admin")
        if admin != nil 
            # admin.find_each do |admin|
              rescid = admin.rescue_id
              resc = Rescue.find(rescid)
            #   resc << Rescue.find(rescid)
              render json: { message: `Before you can delete your account, you need to assign a new admin for: #{resc}`}
            # end
        else
            user.destroy
            session[:user_id] = nil
        end
    end

    private 
    def user_params
        params.permit(:name, :password, :password_confirmation, :location, :userrescues)
        # params.permit(:name, :password, :password_confirmation, userrescues)
    end

    def find_user
        user = User.find(params[:id])
    end
end
