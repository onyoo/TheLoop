require 'rails_helper'
require 'event_helper'

describe Event do

  before(:each) do
    @event = Event.new
  end

  it "can assign params to create a new event from Evently" do
    @event.assign_attributes(evently_params)
    expect(@event).to be_valid
    expect(@event.title).to eq("Workshop Wearable Technology - Roma")
    expect(@event.street_address).to eq("Via Casilina 3T")
    expect(@event.city).to eq("Rome")
    expect(@event.api_id).to eq("E0-001-092704646-3")
    expect(@event.image_url).to eq("http://s4.evcdn.com/images/medium/I0-001/027/148/311-8.png_/workshop-wearable-technology-roma-11.png")
    expect(@event.category_id).to be_a(Integer)
    expect(@event.venue_id).to be_a(Integer)
  end

  # it "can assign params from an existing event" do
  #   params = loop_params_from_evently
  #   expect(@event.assign_attributes(params)).to be_valid
  # end

  it "can assign params to create a new loop event" do
    expect(@event.assign_attributes(new_loop_event_params)).to be_valid
  end

  it "can assign params to create a new loop event" do
    @event.assign_attributes(new_loop_event_params)
    @event.assign_attributes(edited_loop_event_params)

    expect(@event.title).to eq("Lounging @ Trump Tower")
    expect(@event.description).to eq("We will do nothing all day. That seems to be what happens in this place.")
    expect(@event.venue.name).not_to be(new_loop_event_params[:venue])
  end

end
