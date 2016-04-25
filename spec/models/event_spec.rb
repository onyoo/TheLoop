require 'rails_helper'
require 'event_helper'

describe Event do
  before(:each) do
    @params = evently_params
  end

  it "can assign params to create a new event" do
    @event = Event.new
    expect(@event.assign_attributes(@params)).to be_valid
  end

end
