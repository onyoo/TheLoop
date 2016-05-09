class Event < ActiveRecord::Base

  has_many :comments
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
    geo_string.split(',').map(&:to_f)
  end

  def self.find_by_zipcode(zipcode)
    location = self.geocode(zipcode)
    if location.success
       latitude = location.lat
       longitude = location.lng
    end
    self.within(25, :origin => [latitude,longitude])
  end
  
  def venue_name=(venue)
    self.update(venue_id: Venue.find_or_create_by(name: venue).id)
  end

  def categories=(category)
    if category[:name]
      category_name = category[:name]
    else
      category_name = category[:category].first[:name].gsub('&amp;', '').split(' ').first
    end
    self.update(category_id: Category.find_or_create_by(name: category_name).id)
  end

  def images=(image)
    self.update(image_url: image[:image][:thumb][:url]) unless image.nil?
  end

  def address=(street)
    self.update(street_address: street)
  end

  def url=(api_url)
    self.update(event_url: api_url)
  end

  def set_location
    address = street_address
    address += (", " + city)                    unless city.nil?
    address += (", " + self[:region_abbr])      unless region_abbr.nil?
    address += (' ' + self[:postal_code].to_s)  unless postal_code.nil?
    address += (", " + self[:country_abbr])     unless country_abbr.nil?

    if self.latitude.nil?
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
