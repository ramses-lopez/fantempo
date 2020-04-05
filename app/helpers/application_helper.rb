module ApplicationHelper
  def redirect_if_logged_in
    # TODO redirect to user landing if user has a validated number
    redirect_to validations_path unless current_user.nil?
  end

  def redirect_if_logged_out
    redirect_to login_path if current_user.nil?
  end

  # UI Helpers
  def responsive_col_css
    "col-xl-6 col-lg-6 col-md-6 col-sm-10"
  end

end
