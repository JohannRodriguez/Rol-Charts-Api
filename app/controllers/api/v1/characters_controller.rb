module Api
  module V1
    class CharactersController < ApplicationController
      include CurrentUserConcern

      def index
        user = User.find_by(username: params[:user])
        @characters = user.characters.all if user
        @owner = false
        @owner = true if user === @current_user
 
        if user
          render :index
        else
          render json: { status: 'NO_USER' }
        end
      end

      def show
        user = User.find(params[:user])
        character = user.characters.find_by(name: params[:id])

        if character
          render json: { status: 'SUCCESS', character: {
              user_id: character.user_id,
              id: character.id,
              name: character.name,
              alias: character.alias,
              bio: character.bio,
              universe: character.universe
            }
          }
        else
          render json: { status: 'NO_CHARACTER' }
        end
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
        character = @current_user.characters.find(params[:id])

        if character
          if (Time.now.to_i - session[:auth_time]) > 18000
            session[:auth_status] = 'NOT_AUTH'
            render json: { status: 'NOT_AUTH' }
          elsif character.update(character_params)
            render json: { status: 'SUCCESS' }
          else
            render json: { status: 'FAILURE' }
          end
        else
          render json: 'NO_CHARACTER'
        end
      end

      def destroy
        character = Character.find_by(id: params[:id])
        user = @current_user if @current_user[:id] === character[:user_id]

        if user
          if (Time.now.to_i - session[:auth_time]) > 18000
            session[:auth_status] = 'NOT_AUTH'
            render json: { status: 'NOT_AUTH' }
          elsif character.destroy
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