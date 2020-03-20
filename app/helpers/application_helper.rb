module ApplicationHelper
  def redirect_if_logged_in
    redirect_to validations_path if current_user.present?
  end

  def redirect_if_logged_out
    redirect_to login_path if current_user.nil?
  end
end
