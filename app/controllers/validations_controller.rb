class ValidationsController < ApplicationController
  before_action :set_validation, only: [:show, :edit, :update, :destroy]

  def index
    @phone_list = Validation.phone_list
  end

  def phone_list
    render json: Validation.phone_list
  end

  def new
    @validation = Validation.new
  end

  def edit
  end

  def create
    @validation = Validation.new(validation_params)

    respond_to do |format|
      if @validation.save
        format.html { redirect_to @validation, notice: 'Validation was successfully created.' }
        format.json { render :show, status: :created, location: @validation }
      else
        format.html { render :new }
        format.json { render json: @validation.errors, status: :unprocessable_entity }
      end
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_validation
      @validation = Validation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def validation_params
      params.require(:validation).permit(:code, :user_id)
    end
end
