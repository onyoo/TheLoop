class Event < ActiveRecord::Base
  has_many :user_events
  has_many :users, through: :user_events
  belongs_to :category
  belongs_to :venue

  include Geokit::Geocoders

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

  def self.find_by_zipcode(zipcode)
    location = self.geocode(zipcode)
    if location.success
       latitude = location.lat
       longitude = location.lng
    end
    self.within(25, :origin => [latitude,longitude])
  end

  def assign_attributes(event_attributes)
    self.creator = event_attributes[:creator]
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
    self.image_url = event_attributes[:image_url] if event_attributes[:image_url]

    if self.latitude == nil
      address = event_attributes[:address]
      address += (", " + event_attributes[:city])         if !event_attributes[:city].nil?
      address += (", " + event_attributes[:region_abbr])  if !event_attributes[:region_abbr].nil?
      address += (' ' + event_attributes[:postal_code].to_s)      if !event_attributes[:postal_code].nil?
      address += (", " + event_attributes[:country_abbr]) if !event_attributes[:country_abbr].nil?
      loc=Event.geocode(address)

      if loc.success
         self.latitude = loc.lat
         self.longitude = loc.lng
      end
    end

    if (event_attributes[:categories][:category][0][:name] rescue false)
      self.category = Category.find_or_create_by(name: event_attributes[:categories][:category][0][:name])
    else
      self.category = Category.find_or_create_by(name: event_attributes[:category][:name])
    end

    if event_attributes[:venue].is_a?(String)
      self.venue = Venue.find_or_create_by(name: event_attributes[:venue])
    else
      self.venue = Venue.find_or_create_by(name: event_attributes[:venue][:name])
    end

  end

  def as_json(options = {})
    super(options.merge(include: [:user_events, :category, :venue, :users]))
  end

end
