class FixCountryColumnName < ActiveRecord::Migration
  def change
    rename_column :events, :country, :country_abbr
  end
end
