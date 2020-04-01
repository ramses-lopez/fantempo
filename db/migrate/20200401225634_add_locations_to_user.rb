class AddLocationsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :phone_number, :string
    add_column :users, :phone_number_validated_on, :datetime
    add_reference :users, :location, foreign_key: true
  end
end
