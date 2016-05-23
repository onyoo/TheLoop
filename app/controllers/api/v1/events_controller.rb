module Api
  module V1
    class EventsController < ApplicationController
      before_action :set_event, only: [:show, :update]
      before_action :set_location, only: [:index]
      before_action :saved_event, only: [:create]
      respond_to :json

      def index
        respond_with(@events)
      end

      def show
        respond_with(@event)
      end

      def create
        if @event.nil?
          @event = Event.new(event_params)
          @event.set_location
        end

        if @event.longitude
          @event.save
          current_user.user_events.create(event_id: @event.id)
          render :json => @event
        end
      end

      def update
        @event.update(event_params)
        render json: @event
      end

      def destroy
        respond_with Event.destroy(params[:id])
      end

    private

      def set_event
        @event = Event.find(params[:id])
      end

      def saved_event
        @event = Event.find_by(title: params[:event][:title])
      end

      def set_location
        if zipcode?
          @events = Event.find_by_zipcode(params[:location])
        else
          location = Event.get_location(params[:location])
          @events = Event.within(25, :origin => location)
        end
      end

      def zipcode?
        params[:location].size == 5
      end

      def event_params
        params.require(:event).permit(:title, :description, :start_time, :event_url, :url, :street_address, :address, :city, :region_abbr, :postal_code, :country_abbr, :latitude, :longitude, :image_url, :creator, :venue_name, :category_name)
      end
    end
  end
end
