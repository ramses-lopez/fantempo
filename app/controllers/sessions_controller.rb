class SessionsController < ApplicationController
  def index
  end

  def create
    render json: {message: 'fetch ok'}
  end

  def delete
  end
end
