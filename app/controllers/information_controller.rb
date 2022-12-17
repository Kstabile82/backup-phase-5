class InformationController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize, only: [:create, :delete, :update]
  wrap_parameters format: [] 

  def show
    info = []
    info = Information.where(rescue_id: params[:id])
    if info
        render json: info, status: 200
    else
        render json: { message: "No info" }, status: :unauthorized
    end
  end

  def create
    info = Information.create!(information_params)
    render json: info
  end

  def destroy
    info = Information.find(params[:id])
    info.destroy
    render json: { message: "Deleted" }
  end

  def update
      info = Information.find(params[:id])
      info.update(information_params)
      render json: info
  end
  private
  def information_params
    params.permit(:title, :text, :rescue_id)
  end
end
