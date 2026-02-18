use std::{sync::Arc, time::{SystemTime, UNIX_EPOCH}};

use axum::{
    Json, Router,
    extract::State,
    routing::post,
    http::StatusCode,
};
use validator::Validate;

use crate::{
    application::{auth::AuthService, traits::UserRepository}, config::Config, domain::models::{AuthResponse, User, auth::{Claims, SigninRequest, SignupRequest}}, error::ApiError
};

use jsonwebtoken::{encode, Header, EncodingKey};

pub struct AuthHandler;

impl AuthHandler {
    pub fn routes<R: UserRepository + 'static>() -> Router<Arc<AuthService<R>>> {
        Router::new()
            .route("/v1/signin", post(Self::signin::<R>))
            .route("/v1/signup", post(Self::signup::<R>))
    }

    pub async fn signin<R: UserRepository>(
        State(service): State<Arc<AuthService<R>>>,
        Json(mut payload): Json<SigninRequest>,
    ) -> Result<(StatusCode, Json<AuthResponse>), ApiError> {
        payload.username = payload.username.to_lowercase();

        payload
            .validate()
            .map_err(|e| ApiError::ValidationError(e.to_string()))?;

        let user = service
            .signin(payload)
            .await
            .map_err(|e| ApiError::ValidationError(e.to_string()))?;

        let expiration = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() + 3600;

        let claims = Claims {
            sub: user.id.to_string(),
            exp: expiration as usize,
        };

        let config = Config::from_env().expect("Failed to load configuration");

        let token = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(config.jwt_secret.as_bytes()),
        ).map_err(|e| ApiError::InternalServerError(e.to_string()))?;

        let auth_response = AuthResponse {
            user: user.into(),
            access_token: token,
        };

        Ok((StatusCode::OK, Json(auth_response)))
    }

    pub async fn signup<R: UserRepository>(
        State(service): State<Arc<AuthService<R>>>,
        Json(mut payload): Json<SignupRequest>
    ) -> Result<(StatusCode, Json<User>), ApiError> {
        payload.username = payload.username.to_lowercase();
        payload.email = payload.email.to_lowercase();
        
        payload.validate().map_err(|e| ApiError::ValidationError(e.to_string()))?;
        let mut user = service.signup(payload).await.map_err(ApiError::Conflict)?;
        user.password = ":| Donbal Chiz Khassi Migardi?".to_string();
        Ok((StatusCode::CREATED, Json(user.into())))
    }
}
