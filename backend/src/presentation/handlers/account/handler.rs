#test
use axum::{
    Json, Router, middleware, routing::{get}, extract::{Extension, State},
};
use std::sync::Arc;
use std::time::Duration;
use validator::Validate;

use aws_sdk_s3::{Client, config::{Region, Credentials}};
use aws_sdk_s3::presigning::PresigningConfig;

use crate::config::Config;
use crate::{
    application::{traits::UserRepository, user::UserService},
    domain::models::{UpdateUserRequest, UserResponse, UploadUrlResponse},
    error::ApiError,
    presentation::middleware::authentication::{authentication, AuthenticatedUser},
};

pub struct AccountHandler;

impl AccountHandler {
    pub fn routes<R: UserRepository + 'static>() -> Router<Arc<UserService<R>>> {
        Router::new()
            .route("/v1/", get(Self::get::<R>).post(Self::update::<R>))
            .route("/v1/upload/", get(Self::create_upload_url))
            .layer(middleware::from_fn(authentication))
    }

    async fn get<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
        Extension(user): Extension<AuthenticatedUser>,
    ) -> Result<Json<UserResponse>, ApiError> {
        let user = service
            .get_user(user.user_id.parse().unwrap())
            .await
            .map_err(ApiError::InternalServerError)?
            .ok_or(ApiError::NotFound)?;
        Ok(Json(user.into()))
    }

    async fn update<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
        Extension(user): Extension<AuthenticatedUser>,
        Json(payload): Json<UpdateUserRequest>,
    ) -> Result<Json<UserResponse>, ApiError> {
        payload.validate()
            .map_err(|e| ApiError::ValidationError(e.to_string()))?;
        let user = service
            .update_user(user.user_id.parse().unwrap(), payload)
            .await
            .map_err(ApiError::InternalServerError)?;
        Ok(Json(user.into()))
    }

    async fn create_upload_url(
        Extension(user): Extension<AuthenticatedUser>,
    ) -> Result<Json<UploadUrlResponse>, ApiError> {
        let env_config = Config::from_env().expect("Failed to load configuration");

        let access_key = &env_config.minio_access_key;
        let secret_key = &env_config.minio_secret_key;
        let endpoint = &env_config.minio_endpoint;
        let public_endpoint = &env_config.minio_public_endpoint;

        let credentials = Credentials::new(
            access_key,
            secret_key,
            None,
            None,
            "minio",
        );

        let config = aws_sdk_s3::config::Builder::new()
            .credentials_provider(credentials)
            .region(Region::new("ir"))
            .endpoint_url(&*endpoint)
            .force_path_style(true)
            .behavior_version(aws_sdk_s3::config::BehaviorVersion::latest())
            .build();

        let client = Client::from_conf(config);

        let bucket_name = "uploads";
        let file_name = "profile_image.png";
        let object_name = format!("{}/{}", user.user_id, file_name);

        let presign_config: PresigningConfig = PresigningConfig::expires_in(Duration::from_secs(3600))
            .map_err(|e| ApiError::InternalServerError(e.to_string()))?;

        let presigned_request = client
            .put_object()
            .bucket(bucket_name)
            .key(&object_name)
            .presigned(presign_config)
            .await
            .map_err(|e| ApiError::InternalServerError(e.to_string()))?;

        let public_url = presigned_request
            .uri()
            .to_string()
            .replace(&*endpoint, &public_endpoint);

        Ok(Json(UploadUrlResponse {
            url: public_url,
            object_name,
        }))
    }
}
