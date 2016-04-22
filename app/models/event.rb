class Event < ActiveRecord::Base
  has_many :user_events
  has_many :users, through: :user_events
  belongs_to :category
  belongs_to :venue

  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  def self.get_location(geo_string)
    geo_array = geo_string.split(',')
    geo_array.collect do |coord|
      coord.to_f
    end
    geo_array
  end


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
    # self.image_url = event_attributes[:images][:image][:medium][:url] if event_attributes[:images]

    if (event_attributes[:categories][:category][0][:name] rescue false)
      self.category = Category.find_or_create_by(name: event_attributes[:categories][:category][0][:name])
    else
      self.category = Category.find_or_create_by(name: event_attributes[:categories][:category])
    end
    self.venue = Venue.find_or_create_by(name: event_attributes[:venue])

  end

  def as_json(options = {})
    super(options.merge(include: [:user_events, :category, :venue]))
  end
end
