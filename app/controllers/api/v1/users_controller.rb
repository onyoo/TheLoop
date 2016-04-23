module Api
  module V1
    class UsersController < ApplicationController
      skip_before_filter :verify_authenticity_token
      before_action :set_event, only: [:destroy]
      respond_to :json

      def index
        respond_with(User.all.order("id DESC"))
      end

      def show
        respond_with(User.find(params[:id]))
      end

      def destroy
        current_user.events.delete(@event)

        respond_to do |format|
          format.json { render :json => @event }
        end
      end

    private

      def set_event
        @event = Event.find(params[:id])
      end
    end

  end
end
