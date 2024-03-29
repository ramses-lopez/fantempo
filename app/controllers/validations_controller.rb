class ValidationsController < ApplicationController
  def index
    @artist_name = session[:artist_id].present? ? Artist.find(session[:artist_id]).name : 'Tu artista favorito'
    @phone_list = CountryList.phone_list
  end

  # send validation code
  def create
    current_user.phone_number = validation_params[:phone_number]
    current_user.save

    # unless Rails.env.development?
      response = Validation.send_verification(validation_params[:phone_number])
    # else
    #   response = { message: 'ok' }
    # end
    render json: response.to_json
  end

  # validate code
  def update
    # TODO: Uncomment to enable twilio
    # unless Rails.env.development?
      response = Validation.validate_code(
                  validation_params[:phone_number],
                  validation_params[:validation_code]
                )
      current_user.validate_phone_number! if response == 'approved'
    # else
    #   response = { message: 'ok' }
    # end
    render json: response.to_json
  end

  private
    def validation_params
      params.require(:validation).permit(:phone_number, :validation_code)
    end
end
