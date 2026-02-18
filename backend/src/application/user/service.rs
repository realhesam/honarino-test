use std::sync::Arc;
use uuid::Uuid;

use crate::domain::{
    models::{User, CreateUserRequest, UpdateUserRequest},
};

use crate::application::traits::UserRepository;

pub struct UserService<R: UserRepository> {
    repo: Arc<R>,
}

impl<R: UserRepository> UserService<R> {
    pub fn new(repo: Arc<R>) -> Self {
        Self { repo }
    }

    pub async fn create_user(&self, req: CreateUserRequest) -> Result<User, String> {
        if self.repo.get_by_email(req.email.clone()).await?.is_some() {
            return Err("email already exists".into());
        }

        if self.repo.get_by_username(req.username.clone()).await?.is_some() {
            return Err("username already exists".into());
        }

        let user = User::new(req.name, req.email, req.username, req.password);
        self.repo.create(user).await
    }

    pub async fn get_user(&self, id: Uuid) -> Result<Option<User>, String> {
        self.repo.get_by_id(id).await
    }

    pub async fn get_all(&self) -> Result<Vec<User>, String> {
        self.repo.get_all().await
    }

    pub async fn update_user(
        &self,
        id: Uuid,
        req: UpdateUserRequest,
    ) -> Result<User, String> {
        let mut user = self.repo.get_by_id(id).await?
            .ok_or("not found")?;

        if let Some(name) = req.name {
            user.name = name;
        }
        if let Some(email) = req.email {
            user.email = email;
        }
        if let Some(username) = req.username {
            user.username = username;
        }
        if let Some(password) = req.password {
            user.password = password;
        }
        if let Some(profile) = req.profile {
            user.profile = profile;
        }
        if let Some(phone) = req.phone {
            user.phone = phone;
        }
        if let Some(address) = req.address {
            user.address = address;
        }
        
        user.admin = user.admin.to_string();
        user.banned = user.banned.to_string();

        self.repo.update(user).await
    }

    pub async fn delete_user(&self, id: Uuid) -> Result<(), String> {
        self.repo.delete(id).await
    }
}
