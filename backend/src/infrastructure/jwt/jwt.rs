use jsonwebtoken::{decode, DecodingKey, Validation};
use axum::http::HeaderMap;

use crate::{config::Config, domain::models::auth::Claims};

pub fn validate_jwt_token(headers: &HeaderMap) -> Result<Claims, String> {
    let auth_header = headers
        .get("Authorization")
        .and_then(|header| header.to_str().ok())
        .ok_or_else(|| "Invalid Auth Header (Its Not Found)".to_string())?;

    let token = auth_header
        .strip_prefix("Bearer ")
        .ok_or_else(|| "Invalid Header Format (Its May be Bearer)".to_string())?;

    let config = Config::from_env().expect("Failed to load configuration");
    let decoding_key = DecodingKey::from_secret(config.jwt_secret.as_bytes());

    let token_data = decode::<Claims>(
        token,
        &decoding_key,
        &Validation::default(),
    )
    .map_err(|e| format!("Validateing JWT Failed: {}", e))?;

    Ok(token_data.claims)
}