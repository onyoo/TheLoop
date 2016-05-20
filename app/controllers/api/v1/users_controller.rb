module Api
  module V1
    class UsersController < ApplicationController
      skip_before_filter :verify_authenticity_token
      before_action :set_event, only: [:destroy]
      before_action :set_user, only: [:show]
      respond_to :json

      def index
        binding.pry
        respond_with(User.all.order("id DESC"))
      end

      def show
        respond_with(@user_events)
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

      def set_user
        @user_events = User.find(params[:id]).events.order('start_time')
      end
    end

  end
end
