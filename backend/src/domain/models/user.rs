use uuid::Uuid;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct User {
    pub id: Uuid,
    #[validate(length(min = 1, max = 255))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 5, max = 12))]
    pub username: String,
    #[validate(length(min = 8, max = 16))]
    pub password: String,
    pub profile: String,
    pub phone: String,
    pub address: String,
    pub admin: String,
    pub banned: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl User {
    pub fn new(name: String, email: String, username: String, password: String) -> Self {
        let now = Utc::now();
        User {
            id: Uuid::new_v4(),
            name,
            email,
            username,
            password,
            profile: "".to_string(),
            phone: "".to_string(),
            address: "".to_string(),
            admin: "0".to_string(),
            banned: "0".to_string(),
            created_at: now,
            updated_at: now,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct CreateUserRequest {
    #[validate(length(min = 1, max = 255))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 5, max = 12))]
    pub username: String,
    #[validate(length(min = 8, max = 16))]
    pub password: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct UpdateUserRequest {
    #[validate(length(min = 1, max = 255))]
    pub name: Option<String>,
    #[validate(email)]
    pub email: Option<String>,
    #[validate(length(min = 5, max = 12))]
    pub username: Option<String>,
    #[validate(length(min = 8, max = 16))]
    pub password: Option<String>,
    #[validate(length(min = 1, max = 255))]
    pub profile: Option<String>,
    #[validate(length(min = 11, max = 11))]
    pub phone: Option<String>,
    #[validate(length(min = 3, max = 255))]
    pub address: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserResponse {
    pub id: String,
    pub name: String,
    pub email: String,
    pub username: String,
    pub profile: String,
    pub phone: String,
    pub address: String,
    pub admin: String,
    pub banned: String,
    pub created_at: String,
    pub updated_at: String,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        UserResponse {
            id: user.id.to_string(),
            name: user.name,
            email: user.email,
            username: user.username,
            profile: user.profile,
            phone: user.phone,
            address: user.address,
            admin: user.admin,
            banned: user.banned,
            created_at: user.created_at.to_rfc3339(),
            updated_at: user.updated_at.to_rfc3339(),
        }
    }
}
