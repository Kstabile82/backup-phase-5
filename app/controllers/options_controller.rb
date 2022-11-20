class OptionsController < ApplicationController
    def show
        opt = []
        opt = Option.where(question_id: params[:id])
        if opt
            render json: opt, status: 200
        else
            render json: { message: "No options" }, status: :unauthorized
        end
      end
    
      def create
       opt = Option.create(option_params)
        render json: opt
      end
    
      def destroy
        opt = Option.find(params[:id])
        opt.destroy
            render json: { message: "Deleted" }
          end
    
      private
      def option_params
        params.permit(:text, :question_id, :correct)
      end
end
