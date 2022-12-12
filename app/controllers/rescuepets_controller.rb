class RescuepetsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize, only: [:create, :delete, :update]
  
    def index
        rescpets = Rescuepet.all
        render json: rescpets
    end
    def create    
        rescpet = Rescuepet.create!(rescuepet_params)
        render json: rescpet, status: :created
    end
    def show
        rescpets = Rescuepet.where(rescue_id: params[:id])
        render json: rescpets
    end
    def update
        pet = Rescuepet.find(params[:id])
        pet.update(rescuepet_params)
        render json: pet
    end

    def destroy
        rescpet = Rescuepet.find(params[:id])
        rescpet.destroy
        render json: { message: "Deleted" }
    end
    
    private
    
    def rescuepet_params
        params.permit(:name, :rescue_id, :breed, :animal, :age)
    end
end
