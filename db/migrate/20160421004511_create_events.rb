class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.string :start_time
      t.string :event_url
      t.string :street_address
      t.string :city
      t.string :region
      t.integer :postal_code
      t.string :country
      t.decimal :latitude
      t.decimal :longitude
      t.string :api_id
      t.string :image_url
      t.integer :category_id
      t.integer :venue_id
      
      
      
      
    end
  end
end



