class AddCountryToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :country_code, :string
  end
end
