# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :redirect_if_logged_in

  def index
    @artist_name = 'Tu artista favorito'

    return unless params[:artist].present?

    artist = Artist.find_by(id: params[:artist])
    if artist.present?
      session[:artist_id] = params[:artist]
      @artist_name = artist.name
    end
  end
end
