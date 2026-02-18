#test ci1
use api_clean_architecture::config::Config;
use api_clean_architecture::infrastructure::{Database};
use api_clean_architecture::presentation::routes;
use axum::Router;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;
use tracing_subscriber;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::from_default_env()
                .add_directive("info".parse().unwrap()),
        )
        .init();

    let config = Config::from_env().expect("Failed to load configuration");
    tracing::info!("Configuration loaded: {:?}", config);

    let db = Database::new(&config.database_url)
        .await
        .expect("Failed to initialize database");

    tracing::info!("Database connected successfully");

    db.run_migrations()
        .await
        .expect("Failed to run migrations");

    let app = Router::new()
        .nest("/api", routes::create_routes(db.pool))
        .layer(TraceLayer::new_for_http())
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([0, 0, 0, 0], config.app_port));
    tracing::info!("Server listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("Failed to bind to address");

    let make_service = app.into_make_service_with_connect_info::<SocketAddr>();

    axum::serve(listener, make_service)
        .await
        .expect("Server error");
}
