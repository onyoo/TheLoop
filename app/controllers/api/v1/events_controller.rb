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
        if @event = Event.find_by(title: params[:event][:title])
          UserEvent.create(user_id: current_user.id, event_id: @event.id)
          respond_to do |format|
            format.json { render :json => @event }
          end
        else
          @event = Event.create_loop_event(event_params)
          @event.creator = current_user.id if @event.api_id.nil?

          if @event.save
            respond_to do |format|
              format.json { render :json => @event }
            end
          end
          UserEvent.create(user_id: current_user.id, event_id: @event.id)
        end
      end

      def update
        if (params[:event][:id][:id] rescue false)
          # Editing loop events
          @event = Event.find(params[:event][:id][:id])
          @event.assign_attributes(params[:event][:id])    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ to edit loop event
        else
          # hits for adding to my_events ---may want to refactor
          @event = Event.find(params[:event][:id])
          binding.pry
          @event.assign_attributes(params[:event])         #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ this could be loop event or evently event
          @event.users << current_user
        end
        # if @event.assign_attributes(params[:event][:id])
          @event.save
          render json: @event
        # else
          # render nothing: true
        # end
      end

      def destroy
        respond_with Event.destroy(params[:id])
      end

    private
      def event_params
        params.require(:event).permit(:title, :description, :start_time, :event_url, :street_address, :city, :region, :region_abbr, :postal_code, :country_abbr, :latitude, :longitude, :image_url, :category, :venue, :venue_id)
      end
    end
  end
end
