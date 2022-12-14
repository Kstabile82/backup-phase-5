class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_unprocessable_entity_response

    private

    def authorize
      @current_user = User.find_by(id: session[:user_id])
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end

    def render_not_found_response
      render json: { error: "Not found" }, status: :not_found
    # render json: { errors: invalid.record.errors }, status: :not_found
    end

    def render_unprocessable_entity_response
      render json: { error: "Not found" }, status: :unprocessable_entity
    # render json: { errors: invalid.record.errors }, status: :not_found
    end
end
