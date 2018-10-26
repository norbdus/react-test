class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.new(user_params)
    if user.save
      render json: {
          "token": user.auth_token
      }
    else
      render json: {
          "message": 'error',
          "error": user.errors.first
      }
    end
  end


  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_todos = user.todos
    render json: { user: { username: user.username, email: user.email, name: user.name }, todos: user_todos }
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :name, :email)
  end

end
