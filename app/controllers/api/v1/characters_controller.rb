module Api
  module V1
    class CharactersController < ApplicationController
      include CurrentUserConcern

      def index
        characters = @current_user.characters.all
        render json: characters
      end

      def create
        character = @current_user.characters.new(character_params)

        if character.save
          render json: { status: 'SUCCESS' }
        else
          render json: { status: 'FAILURE', error: character.errors }
        end
      end

      def update
        
      end

      def destroy
        character = Character.find_by(id: params[:id])
        user = @current_user if @current_user[:id] === character[:user_id]

        if (Time.now.to_i - session[:auth_time]) > 18000
          session[:auth_status] = 'NOT_AUTH'
          render json: { status: 'NOT_AUTH' }
        elsif user
          if character.destroy
            render json: { status: 'SUCCESS' }
          else
            render json: { status: 'FAILURE' }
          end
        else
          render json: { status: 'NO_PERMIT' }
        end
      end

      private

      def character_params
        params.require(:character).permit(:name, :alias, :bio, :universe)
      end
    end
  end
end