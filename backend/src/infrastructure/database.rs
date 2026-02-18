use sea_orm::DbConn;
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::time::Duration;

pub struct Database {
    pub db: DbConn,
    pub pool: PgPool,
}

impl Database {
    pub async fn new(database_url: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let pool = PgPoolOptions::new()
            .max_connections(5)
            .acquire_timeout(Duration::from_secs(30))
            .connect(database_url)
            .await?;

        let db = sea_orm::Database::connect(database_url).await?;

        Ok(Database { db, pool })
    }

    pub async fn run_migrations(&self) -> Result<(), Box<dyn std::error::Error>> {
        tracing::info!("Running database migrations...");
        sqlx::migrate!("./migrations")
            .run(&self.pool)
            .await?;

        tracing::info!("Migrations completed successfully");
        Ok(())
    }
}
