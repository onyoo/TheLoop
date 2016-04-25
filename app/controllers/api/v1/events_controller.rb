module Api
  module V1
    class EventsController < ApplicationController
      skip_before_filter :verify_authenticity_token
      respond_to :json

      def index
        # respond_with(Event.all.where("postal_code = #{params[:location]}"))
        if params[:location]
          @location = Event.get_location(params[:location])
          @events = Event.within(25, :origin => @location)
        elsif params[:zipcode]
          @events = Event.find_by_zipcode(params[:zipcode])
        end
        respond_with(@events.where(api_id: nil))
      end

      def show
        respond_with(Event.find(params[:id]))
      end

      def check
        @event = Event.find_by(api_id: params[:api_id])
        if !!@event
          render :json => @event
        else
          render nothing: true, status: 401
        end
      end

      def create
        if @event = Event.find_by(title: params[:title])
          UserEvent.create(user_id: current_user.id, event_id: @event.id)
          respond_to do |format|
            format.json { render :json => @event }
          end
        else
          @event = Event.new
          @event.assign_attributes(params)
          @event.creator = current_user.id

          if @event.save
            respond_to do |format|
              format.json { render :json => @event }
            end
          end
          UserEvent.create(user_id: current_user.id, event_id: @event.id)
        end
      end

      def update
        @event = Event.find(params[:event][:id][:id])
        if @event.assign_attributes(params[:event][:id])
          @event.save
          render json: @event
        else
          render nothing: true
        end
      end

      def destroy
        respond_with Event.destroy(params[:id])
      end

    private
      def event_params
        params.require(:event).permit(:title, :description, :start_time, :city, :region, :postal_code, :country, :latitude, :longitude, :venue_id)
      end
    end
  end
end
