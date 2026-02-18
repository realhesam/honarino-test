use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub database_url: String,
    pub app_port: u16,
    pub app_host: String,
    pub rust_log: String,
    pub jwt_secret: String,
    pub minio_access_key: String,
    pub minio_secret_key: String,
    pub minio_endpoint: String,
    pub minio_public_endpoint: String,
}

impl Config {
    pub fn from_env() -> Result<Self, Box<dyn std::error::Error>> {
        dotenv::dotenv().ok();

        Ok(Config {
            database_url: env::var("DATABASE_URL")
                .or_else(|_| {
                    let user = env::var("DB_USER").unwrap_or_else(|_| "postgres".to_string());
                    let pass = env::var("DB_PASSWORD").unwrap_or_else(|_| "postgres".to_string());
                    let host = env::var("DB_HOST").unwrap_or_else(|_| "localhost".to_string());
                    let port = env::var("DB_PORT").unwrap_or_else(|_| "5432".to_string());
                    let name = env::var("DB_NAME").unwrap_or_else(|_| "api_db".to_string());
                    Ok::<_, env::VarError>(format!(
                        "postgresql://{}:{}@{}:{}/{}",
                        user, pass, host, port, name
                    ))
                })?,
            app_port: env::var("APP_PORT")
                .unwrap_or_else(|_| "8000".to_string())
                .parse()?,
            app_host: env::var("APP_HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            jwt_secret: env::var("JWT_SECRET").unwrap_or_else(|_| "fnodshfoidshfudshfdsufgdsuuiwegruuugeiqwugb;ueafuOhMyJWTSEEEEEEEEEEEEEEEEEEEEEEEK".to_string()),
            rust_log: env::var("RUST_LOG").unwrap_or_else(|_| "info".to_string()),
            minio_access_key: env::var("MINIO_ROOT_USER").unwrap_or_else(|_| "minioadmin".to_string()),
            minio_secret_key: env::var("MINIO_ROOT_PASSWORD").unwrap_or_else(|_| "minioadmin".to_string()),
            minio_endpoint: env::var("MINIO_ENDPOINT").unwrap_or_else(|_| "http://localhost/".to_string()),
            minio_public_endpoint: env::var("MINIO_PUBLIC_ENDPOINT").unwrap_or_else(|_| "http://localhost/".to_string()),
        })
    }
}
