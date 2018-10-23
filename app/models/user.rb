class User < ApplicationRecord
    validates_uniqueness_of :username, :email
    validates_presence_of :email, :username
    has_secure_password
    has_secure_token :auth_token
    has_many :todos


    def invalidate_token
        self.update_columns(auth_token: nil)
    end

    def self.validate_login(username, password)
        user = find_by(username: username)
        if user && user.authenticate(password)
            user
        end
    end

end
