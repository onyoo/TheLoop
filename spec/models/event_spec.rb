require 'rails_helper'
require 'event_helper'

describe Event do

  before(:each) do
    @event = Event.new
  end

  it "can assign params to create a new event" do
    params = evently_params
    expect(@event.assign_attributes(params)).to be_valid
  end

  it "can assign params to an existing event" do
    params = loop_params_from_evently
    expect(@event.assign_attributes(params)).to be_valid
  end

  it "can assign params to create a new loop event" do
    params = new_loop_event_params
    expect(@event.assign_attributes(params)).to be_valid
  end

end
