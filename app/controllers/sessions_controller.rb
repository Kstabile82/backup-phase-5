class SessionsController < ApplicationController
    def create
        user = User.find_by(name: params[:name])
         if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
         # render json: {message: "successful login", user: user}, status:200
         else
           render json: { errors: ["Invalid username or password"] }, status: :unauthorized
         end
      end
 
     def destroy
         session.delete :user_id
         head :no_content
       end

end