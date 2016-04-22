module Api
  module V1 
    class UsersController < ApplicationController 
      skip_before_filter :verify_authenticity_token 
      respond_to :json 
      def index 
        respond_with(User.all.order("id DESC"))
      end 

      def remove
        @event = Event.find_by(id: params[:id])
        
        current_user.events.delete(@event)
        
        respond_to do |format|
            format.json { render :json => current_user }
          end
        
      end

      def show 
        respond_with(User.find(params[:id]))
      end
      
    end 
  end
end