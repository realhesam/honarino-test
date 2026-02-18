use axum::{
    extract::{Request},
    middleware::Next,
    response::Response,
    http::{StatusCode},
};

use crate::infrastructure::validate_jwt_token;

#[derive(Debug, Clone)]
pub struct AuthenticatedUser {
    pub user_id: String,
}

pub async fn authentication(
    mut req: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    
    let headers = req.headers();

    match validate_jwt_token(headers) {
        Ok(claims) => {
            let authenticated_user = AuthenticatedUser {
                user_id: claims.sub,
            };
            req.extensions_mut().insert(authenticated_user);
            
            Ok(next.run(req).await)
        }
        Err(_e) => {
            Err(StatusCode::UNAUTHORIZED)
        }
    }
}
