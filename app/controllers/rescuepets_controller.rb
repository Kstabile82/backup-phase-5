class RescuepetsController < ApplicationController
    def index
        rescpets = Rescuepet.all
        render json: rescpets
    end
    def create    
        rescpet = Rescuepet.create!(rescuepet_params)
        render json: rescpet, status: :created
    end
    def show
        rescpets = Rescuepet.where(rescue_id: params[:id].to_i)
        render json: rescpets
    end
    def destroy
        rescpet = Rescuepet.find(params[:id])
        rescpet.destroy
        render json: { message: "Deleted" }
    end
    
    private
    
    def rescuepet_params
        params.permit(:name, :rescue_id, :breed, :animal, :size, :age)
    end
end
