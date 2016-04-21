module Api
  module V1
    class EventsController < ApplicationController
      skip_before_filter :verify_authenticity_token
      respond_to :json
      def index
        respond_with(Event.all.order("id DESC"))
      end
      def show
        respond_with(Event.find(params[:id]))
      end
      def create
        @event = Event.new(event_params)
        if @event.save
          respond_to do |format|
            format.json { render :json => @event }
          end
        end
      end
      def update
        @event = Event.find(params[:id])
        if @event.update(event_params)
          respond_to do |format|
            format.json { render :json => @event }
          end
        end
      end

      def destroy
        respond_with Event.destroy(params[:id])
      end
      private
        def event_params
          params.require(:event).permit(:title, :author_id, :reading_level_id, :user_id)
        end
    end
  end
end
