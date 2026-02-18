use async_trait::async_trait;
use uuid::Uuid;
use crate::domain::models::User;

#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn create(&self, user: User) -> Result<User, String>;
    async fn get_by_id(&self, id: Uuid) -> Result<Option<User>, String>;
    async fn get_all(&self) -> Result<Vec<User>, String>;
    async fn update(&self, user: User) -> Result<User, String>;
    async fn delete(&self, id: Uuid) -> Result<(), String>;
    async fn get_by_email(&self, email: String) -> Result<Option<User>, String>;
    async fn get_by_username(&self, username: String) -> Result<Option<User>, String>;
}
