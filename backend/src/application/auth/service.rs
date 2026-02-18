use std::sync::Arc;

use crate::domain::models::auth::{SigninRequest, SignupRequest};
use crate::{domain::models::User};

use crate::application::traits::{UserRepository};
pub struct AuthService<R: UserRepository> {
    repo: Arc<R>,
}

impl<R: UserRepository> AuthService<R> {
    pub fn new(repo: Arc<R>) -> Self {
        Self { repo }
    }

    pub async fn signin(&self, req: SigninRequest) -> Result<User, String>
    {
        let user = self.repo.get_by_username(req.username.clone()).await?
            .ok_or("نام کاربری یا کلمه عبور اشتباه میباشد")?;

        if (user.password).to_string() != req.password.to_string() {
            return Err("نام کاربری یا کلمه عبور اشتباه میباشد".to_string());
        }
        
        if (user.banned).to_string() == "1".to_string() {
            return Err("اکانت شما محدود شده است".to_string());
        }

        Ok(user)
    }

    pub async fn signup(&self, req: SignupRequest) -> Result<User, String>
    {
        if self.repo.get_by_email(req.email.clone()).await?.is_some() {
            return Err("email already exists".into());
        }

        if self.repo.get_by_username(req.username.clone()).await?.is_some() {
            return Err("username already exists".into());
        }

        let user = User::new(req.name, req.email, req.username, req.password);
        self.repo.create(user).await
    }
}