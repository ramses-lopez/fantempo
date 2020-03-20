class ValidationsController < ApplicationController
  def index
    @phone_list = Validation.phone_list
  end

  def create
    response = Validation.send_verification(validation_params[:phone_number])
    render json: response.to_json
  end

  def update
    response = Validation.validate_code(
                validation_params[:phone_number],
                validation_params[:validation_code]
              )
    render json: response.to_json
  end

  private
    def validation_params
      params.require(:validation).permit(:phone_number, :validation_code)
    end
end
