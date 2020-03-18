class Validation < ApplicationRecord
  belongs_to :user

  def self.phone_list
    ISO3166::Country.all
      .select do |country|
        ['ES', 'US', 'CA', 'VE'].include?(country.alpha2)
      end.map do |country|
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

end
