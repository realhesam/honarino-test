use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::domain::models::UserResponse;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub user: UserResponse,
    pub access_token: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct SigninRequest {
    #[validate(length(min = 5, max = 12))]
    pub username: String,
    #[validate(length(min = 8, max = 16))]
    pub password: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct SignupRequest {
    #[validate(length(min = 1, max = 255))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 5, max = 12))]
    pub username: String,
    #[validate(length(min = 8, max = 16))]
    pub password: String,
}