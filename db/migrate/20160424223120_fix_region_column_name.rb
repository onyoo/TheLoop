class FixRegionColumnName < ActiveRecord::Migration
  def change
    rename_column :events, :region, :region_abbr
  end
end
