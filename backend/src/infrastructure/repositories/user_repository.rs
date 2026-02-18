use async_trait::async_trait;
use uuid::Uuid;
use sqlx::PgPool;
use chrono::{Utc, DateTime};

use crate::domain::models::User;
use crate::application::traits::UserRepository;

pub struct PostgresUserRepository {
    pool: PgPool,
}

impl PostgresUserRepository {
    pub fn new(pool: PgPool) -> Self {
        PostgresUserRepository { pool }
    }
}

#[async_trait]
impl UserRepository for PostgresUserRepository {
    async fn create(&self, user: User) -> Result<User, String> {
        let result = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, String, String, String, DateTime<Utc>, DateTime<Utc>)>(
            r#"
            INSERT INTO users (id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at
            "#,
        )
        .bind(user.id)
        .bind(&user.name)
        .bind(&user.email)
        .bind(&user.username)
        .bind(&user.password)
        .bind(&user.profile)
        .bind(&user.phone)
        .bind(&user.address)
        .bind(&user.admin)
        .bind(&user.banned)
        .bind(user.created_at)
        .bind(user.updated_at)
        .fetch_one(&self.pool)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

        Ok(User {
            id: result.0,
            name: result.1,
            email: result.2,
            username: result.3,
            password: result.4,
            profile: result.5,
            phone: result.6,
            address: result.7,
            admin: result.8,
            banned: result.9,
            created_at: result.10,
            updated_at: result.11
        })
    }

    async fn get_by_id(&self, id: Uuid) -> Result<Option<User>, String> {
        let result = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, String, String, String, DateTime<Utc>, DateTime<Utc>)>(
            "SELECT id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at FROM users WHERE id = $1",
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

        Ok(result.map(|row| User {
            id: row.0,
            name: row.1,
            email: row.2,
            username: row.3,
            password: row.4,
            profile: row.5,
            phone: row.6,
            address: row.7,
            admin: row.8,
            banned: row.9,
            created_at: row.10,
            updated_at: row.11
        }))
    }

    async fn get_all(&self) -> Result<Vec<User>, String> {
        let results = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, String, String, String, DateTime<Utc>, DateTime<Utc>)>(
            "SELECT id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at FROM users ORDER BY created_at DESC",
        )
        .fetch_all(&self.pool)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

        Ok(results
            .into_iter()
            .map(|row| User {
                id: row.0,
                name: row.1,
                email: row.2,
                username: row.3,
                password: row.4,
                profile: row.5,
                phone: row.6,
                address: row.7,
                admin: row.8,
                banned: row.9,
                created_at: row.10,
                updated_at: row.11
            })
            .collect())
    }

    async fn update(&self, user: User) -> Result<User, String> {
        let result = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, String, String, String, DateTime<Utc>, DateTime<Utc>)>(
            r#"
            UPDATE users
            SET name = $2, email = $3, username = $4, password = $5, profile = $6, phone = $7, address = $8, admin = $9, banned = $10, updated_at = $11
            WHERE id = $1
            RETURNING id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at
            "#,
        )
        .bind(user.id)
        .bind(&user.name)
        .bind(&user.email)
        .bind(&user.username)
        .bind(&user.password)
        .bind(&user.profile)
        .bind(&user.phone)
        .bind(&user.address)
        .bind(&user.admin)
        .bind(&user.banned)
        .bind(Utc::now())
        .fetch_one(&self.pool)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

        Ok(User {
            id: result.0,
            name: result.1,
            email: result.2,
            username: result.3,
            password: result.4,
            profile: result.5,
            phone: result.6,
            address: result.7,
            admin: result.8,
            banned: result.9,
            created_at: result.10,
            updated_at: result.11
        })
    }

    async fn delete(&self, id: Uuid) -> Result<(), String> {
        sqlx::query("DELETE FROM users WHERE id = $1")
            .bind(id)
            .execute(&self.pool)
            .await
            .map_err(|e| format!("Database error: {}", e))?;

        Ok(())
    }

    async fn get_by_email(&self, email: String) -> Result<Option<User>, String> {
        let result = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, String, String, String, DateTime<Utc>, DateTime<Utc>)>(
            "SELECT id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at FROM users WHERE email = $1",
        )
        .bind(email)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

        Ok(result.map(|row| User {
            id: row.0,
            name: row.1,
            email: row.2,
            username: row.3,
            password: row.4,
            profile: row.5,
            phone: row.6,
            address: row.7,
            admin: row.8,
            banned: row.9,
            created_at: row.10,
            updated_at: row.11
        }))
    }

    async fn get_by_username(&self, username: String) -> Result<Option<User>, String> {
        let result = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, String, String, String, DateTime<Utc>, DateTime<Utc>)> (
            "SELECT id, name, email, username, password, profile, phone, address, admin, banned, created_at, updated_at FROM users WHERE username = $1",
        )
        .bind(username)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

        Ok(result.map(| row | User {
            id: row.0,
            name: row.1,
            email: row.2,
            username: row.3,
            password: row.4,
            profile: row.5,
            phone: row.6,
            address: row.7,
            admin: row.8,
            banned: row.9,
            created_at: row.10,
            updated_at: row.11
        }))
    }
}
