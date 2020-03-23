class ValidationsController < ApplicationController
  def index
    @phone_list = CountryList.phone_list
  end

  # send validation code
  def create
    # TODO: Uncomment to enable twilio
    unless Rails.env.development?
      response = Validation.send_verification(validation_params[:phone_number])
    else
      response = { message: 'ok' }
    end
    render json: response.to_json
  end

  # validate code
  def update
    # TODO: Uncomment to enable twilio
    unless Rails.env.development?
      response = Validation.validate_code(
                  validation_params[:phone_number],
                  validation_params[:validation_code]
                )
    else
      response = { message: 'ok' }
    end
    render json: response.to_json
  end

  private
    def validation_params
      params.require(:validation).permit(:phone_number, :validation_code)
    end
end
