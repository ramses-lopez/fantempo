module ApplicationHelper
  def redirect_if_logged_in
    redirect_to validations_path if current_user.present?
  end
end
