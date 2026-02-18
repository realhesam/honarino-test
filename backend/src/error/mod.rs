use thiserror::Error;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Not found")]
    NotFound,

    #[error("Bad request: {0}")]
    BadRequest(String),

    #[error("Internal server error: {0}")]
    InternalServerError(String),

    #[error("Validation error: {0}")]
    ValidationError(String),

    #[error("Conflict: {0}")]
    Conflict(String),

    #[error("Unauthorized")]
    Unauthorized,
}

#[derive(Serialize)]
pub struct ErrorResponse {
    pub error: String,
    pub message: String,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, error, message) = match self {
            ApiError::NotFound => (
                StatusCode::NOT_FOUND,
                "NOT_FOUND".to_string(),
                "Resource not found".to_string(),
            ),
            ApiError::BadRequest(msg) => (
                StatusCode::BAD_REQUEST,
                "BAD_REQUEST".to_string(),
                msg,
            ),
            ApiError::InternalServerError(msg) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR".to_string(),
                msg,
            ),
            ApiError::ValidationError(msg) => (
                StatusCode::BAD_REQUEST,
                "VALIDATION_ERROR".to_string(),
                msg,
            ),
            ApiError::Conflict(msg) => (
                StatusCode::CONFLICT,
                "CONFLICT".to_string(),
                msg,
            ),
            ApiError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "UNAUTHORIZED".to_string(),
                "Unauthorized access".to_string(),
            ),
        };

        let body = axum::Json(ErrorResponse { error, message });
        (status, body).into_response()
    }
}
