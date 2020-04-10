class Location < ApplicationRecord
  PERMITTED_COUNTRIES = %w[ES US CA VE]

  def self.city_list
    self.where(country_code: PERMITTED_COUNTRIES)
  end

end
