class CountryList
  PERMITTED_COUNTRIES = %w[ES US CA VE]
  CITY_LIST = [
    { name: "Madrid", lng: -3.7041, lat: 40.4174 },
    { name: "Toronto", lng: -79.3875, lat: 43.6515 },
    { name: "Caracas", lng: -66.9170, lat: 10.4949 },
    { name: "Santiago de Chile", lng: -70.6462, lat: -33.4385 }
  ]

  def self.phone_list
    ISO3166::Country
      .all
      .select { |country| PERMITTED_COUNTRIES.include?(country.alpha2) }
      .map do |country|
      {
        name: country.name,
        flag: country.emoji_flag,
        phone_destination_length: country.national_destination_code_lengths.first,
        phone_number_length: country.national_number_lengths.first,
        phone_country_code: country.country_code,
        country_code: country.alpha2
      }
    end
  end

  def self.city_list
    CITY_LIST
  end

end