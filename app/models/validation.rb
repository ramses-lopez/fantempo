# frozen_string_literal: true

class Validation < ApplicationRecord
  belongs_to :user

  def self.phone_list
    ISO3166::Country
      .all
      .select { |country| %w[ES US CA VE].include?(country.alpha2) }
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

  def self.send_verification(phone_number)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    verify_sid = ENV['TWILIO_VERIFY_SID']
    auth_token = ENV['TWILIO_ACCOUNT_AUTH_TOKEN']
    api_token = ENV['TWILIO_API_SECRET']

    client = Twilio::REST::Client.new(account_sid, auth_token)
    verification = client.verify
                         .services(verify_sid)
                         .verifications
                         .create(to: phone_number, channel: 'sms')

    puts "sending code to #{phone_number}: #{verification_check.status} "

    verification.status
  end

  def self.validate_code(phone_number, validation_code)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    verify_sid = ENV['TWILIO_VERIFY_SID']
    auth_token = ENV['TWILIO_ACCOUNT_AUTH_TOKEN']
    api_token = ENV['TWILIO_API_SECRET']

    client = Twilio::REST::Client.new(account_sid, auth_token)
    verification_check = client.verify
                               .services(verify_sid)
                               .verification_checks
                               .create(to: phone_number, code: validation_code)
    puts "validating code for #{phone_number} (#{validation_code}): #{verification_check.status}"
    verification_check.status
  end
end
