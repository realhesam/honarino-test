use axum::{Router};
use sqlx::PgPool;
use std::sync::Arc;

use crate::application::auth::AuthService;
use crate::infrastructure::PostgresUserRepository;
use crate::presentation::handlers::auth::AuthHandler;
use crate::presentation::handlers::user::UserHandler;
use crate::presentation::handlers::account::AccountHandler;
use crate::application::user::UserService;

pub fn create_routes(pool: PgPool) -> Router {
    let user_repo = Arc::new(PostgresUserRepository::new(pool));

    let user_service = Arc::new(UserService::new(Arc::clone(&user_repo)));

    let auth_service = Arc::new(AuthService::new(Arc::clone(&user_repo)));

    Router::new()
        .route("/health", axum::routing::get(|| async { "OK" }))
        .nest("/users", UserHandler::routes().with_state(Arc::clone(&user_service)))
        .nest("/account", AccountHandler::routes().with_state(Arc::clone(&user_service)))
        .nest("/auth", AuthHandler::routes().with_state(auth_service))
}
