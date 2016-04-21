class Event < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  belongs_to :venue


  def assign_attributes(event_attributes)
    self.title = event_attributes[:title]
    self.description = event_attributes[:description]
    self.start_time = event_attributes[:start_time]
    self.event_url = event_attributes[:url]
    self.street_address = event_attributes[:address]
    self.city = event_attributes[:city]
    self.region = event_attributes[:region_abbr]
    self.postal_code = event_attributes[:postal_code]
    self.country = event_attributes[:country_abbr]
    self.latitude = event_attributes[:latitude]
    self.longitude = event_attributes[:longitude]
    self.api_id = event_attributes[:id]
    self.image_url = event_attributes[:images][:image][:medium][:url] if event_attributes[:images]

    self.category = Category.find_or_create_by(name: event_attributes[:categories][:category][0][:name])
    self.venue = Venue.find_or_create_by(name: event_attributes[:venue_name])

  end

  def as_json(options = {})
    super(options.merge(include: [:user, :category, :venue]))
  end
end