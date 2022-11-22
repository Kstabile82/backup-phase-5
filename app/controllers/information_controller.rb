class InformationController < ApplicationController

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
    info = Information.create(information_params)
    render json: info
  end

  def destroy
    info = Information.find(params[:id])
    info.destroy
        render json: { message: "Deleted" }
      end

  private
  def information_params
    params.permit(:title, :text, :rescue_id)
  end
end