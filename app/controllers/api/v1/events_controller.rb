module Api
  module V1
    class EventsController < ApplicationController
      skip_before_filter :verify_authenticity_token
      respond_to :json

      def index
        if params[:location]
          location = Event.get_location(params[:location])
          events = Event.within(25, :origin => location)
        elsif params[:zipcode]
          events = Event.find_by_zipcode(params[:zipcode])
        end
        respond_with(events.where(api_id: nil))
      end

      def show
        respond_with(Event.find(params[:id]))
      end

      def check
        event = Event.find_by(api_id: params[:api_id])
        if !!event
          render :json => event
        else
          render nothing: true, status: 401
        end
      end

      def create
        if event = Event.find_by(title: params[:event][:title])
          event.users << current_user if !event.users.detect{ |user| user.id == current_user.id}
          respond_to do |format|
            format.json { render :json => event }
          end
        else
          event = Event.create(event_params)
          event.create_relations(params, current_user)

          respond_to do |format|
            format.json { render :json => event }
          end
        end
      end

      def update
        event = Event.find(params[:id])
        event.update(event_params)
        event.update_relations(params, current_user)
        render json: event
      end

      def destroy
        respond_with Event.destroy(params[:id])
      end

    private
      def event_params
        params.require(:event).permit(:api_id, :category_id, :creator, :title, :description, :start_time, :event_url, :street_address, :city, :region_abbr, :postal_code, :country_abbr, :latitude, :longitude, :image_url, :category, :venue, :venue_id)
      end
    end
  end
end
