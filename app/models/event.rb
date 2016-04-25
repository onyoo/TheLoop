class Event < ActiveRecord::Base

  has_many :comments
  has_many :users, through: :comments
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
    self.creator = event_attributes[:creator] if !event_attributes[:creator].nil?
    self.title = event_attributes[:title] if !event_attributes[:title].nil?
    self.description = event_attributes[:description] if !event_attributes[:description].nil?
    self.start_time = event_attributes[:start_time] if !event_attributes[:start_time].nil?
    self.event_url = event_attributes[:url] if !event_attributes[:url].nil?
    self.street_address = event_attributes[:street_address] if !event_attributes[:street_address].nil?
    self.city = event_attributes[:city] if !event_attributes[:city].nil?
    self.region_abbr = event_attributes[:region_abbr] if !event_attributes[:region_abbr].nil?
    self.postal_code = event_attributes[:postal_code] if !event_attributes[:postal_code].nil?
    self.country_abbr = event_attributes[:country_abbr] if !event_attributes[:country_abbr].nil?
    self.latitude = event_attributes[:latitude] if !event_attributes[:latitude].nil?
    self.longitude = event_attributes[:longitude] if !event_attributes[:longitude].nil?
    self.api_id = event_attributes[:id] if event_attributes[:creator].nil?

    if event_attributes[:images]
      if (event_attributes[:images][:image][:medium][:url] rescue false)
        self.image_url = event_attributes[:images][:image][:medium][:url]
      else
        self.image_url = event_attributes[:images][:image][0][:medium][:url]
      end
    end
    self.image_url = event_attributes[:image_url] if event_attributes[:image_url]

    set_location(event_attributes)
    set_category(event_attributes)
    set_venue(event_attributes)

  end

  def set_category(event_attributes)
    if (event_attributes[:categories][:category][0][:name] rescue false)
      # For Evently event creation
      self.category = Category.find_or_create_by(name: event_attributes[:categories][:category][0][:name])
    elsif event_attributes[:category].is_a?(String)
      # For creating/editing local events
      self.category = Category.find_or_create_by(name: event_attributes[:category])
    else
      # For editing local events
      self.category = Category.find_or_create_by(name: event_attributes[:category][:name]) if !event_attributes[:category].nil?
    end
  end

  def set_venue(event_attributes)
    if event_attributes[:venue].is_a?(String) && event_attributes[:venue].present?
      self.venue = Venue.find_or_create_by(name: event_attributes[:venue])
    elsif event_attributes[:venue_name].is_a?(String)
      self.venue = Venue.find_or_create_by(name: event_attributes[:venue_name])
    elsif (event_attributes[:venue][:name].is_a?(String) rescue false)
      self.venue = Venue.find_or_create_by(name: event_attributes[:venue][:name])
    end
  end

  def set_location(event_attributes)
    if self.latitude.nil?
      address = event_attributes[:street_address]
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
  end

  def as_json(options = {})
    super(options.merge(include: [:user_events, :category, :venue, :users, :comments => {:include => :user}]))
  end

end
