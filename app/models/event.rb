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

  def update_relations(params, current_user)
    self.venue = Venue.find_or_create_by(name: params[:venue][:name]) if !params[:venue].nil?
    self.category = Category.find(params[:event][:category_id])
    self.users << current_user if !self.users.detect{ |user| user.id == current_user.id}
    save
  end

  def create_relations(params, current_user)
    self.street_address = params[:event][:address] if params[:event][:address]
    self.venue = Venue.find_or_create_by(name: params[:event][:venue_name])
    self.creator = current_user.id if self.api_id.nil?
    self.category = Category.find_or_create_by(name: params[:event][:category][:name]) if !params[:event][:category].nil?
    self.set_location
    self.users << current_user
    save
  end

  def set_location
    address = self[:street_address]
    address += (", " + self[:city])             if !self[:city].nil?
    address += (", " + self[:region_abbr])      if !self[:region_abbr].nil?
    address += (' ' + self[:postal_code].to_s)  if !self[:postal_code].nil?
    address += (", " + self[:country_abbr])     if !self[:country_abbr].nil?

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
