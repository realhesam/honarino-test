use axum::{
    Json, Router, extract::{Path, State}, http::StatusCode, middleware, routing::{get, post}
};
use std::sync::Arc;
use uuid::Uuid;
use validator::Validate;

use crate::{
    application::{traits::UserRepository, user::UserService},
    domain::models::{CreateUserRequest, UpdateUserRequest, UserResponse},
    error::ApiError, presentation::middleware::authentication::authentication,
};

pub struct UserHandler;

impl UserHandler {
    pub fn routes<R: UserRepository + 'static>() -> Router<Arc<UserService<R>>> {
        Router::new()
            .route("/v1/", post(Self::create::<R>).get(Self::get_all::<R>))
            .route(
                "/v1/{id}",
                get(Self::get::<R>)
                    .put(Self::update::<R>)
                    .delete(Self::delete::<R>),
            )
            .layer(middleware::from_fn(authentication))
    }

    async fn create<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
        Json(payload): Json<CreateUserRequest>,
    ) -> Result<(StatusCode, Json<UserResponse>), ApiError> {
        payload.validate().map_err(|e| ApiError::ValidationError(e.to_string()))?;
        let user = service.create_user(payload).await.map_err(ApiError::Conflict)?;
        Ok((StatusCode::CREATED, Json(user.into())))
    }

    async fn get<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
        Path(id): Path<Uuid>,
    ) -> Result<Json<UserResponse>, ApiError> {
        let user = service.get_user(id).await.map_err(ApiError::InternalServerError)?
            .ok_or(ApiError::NotFound)?;
        Ok(Json(user.into()))
    }

    async fn get_all<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
    ) -> Result<Json<Vec<UserResponse>>, ApiError> {
        let users = service.get_all().await.map_err(ApiError::InternalServerError)?;
        Ok(Json(users.into_iter().map(Into::into).collect()))
    }

    async fn update<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
        Path(id): Path<Uuid>,
        Json(payload): Json<UpdateUserRequest>,
    ) -> Result<Json<UserResponse>, ApiError> {
        payload.validate().map_err(|e| ApiError::ValidationError(e.to_string()))?;
        let user = service.update_user(id, payload).await.map_err(ApiError::InternalServerError)?;
        Ok(Json(user.into()))
    }

    async fn delete<R: UserRepository>(
        State(service): State<Arc<UserService<R>>>,
        Path(id): Path<Uuid>,
    ) -> Result<StatusCode, ApiError> {
        service.delete_user(id).await.map_err(ApiError::InternalServerError)?;
        Ok(StatusCode::NO_CONTENT)
    }
}
