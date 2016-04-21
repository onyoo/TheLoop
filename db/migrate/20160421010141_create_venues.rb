class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
    end
  end
end
