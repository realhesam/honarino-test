use serde::Serialize;

#[derive(Serialize)]
pub struct UploadUrlResponse {
    pub url: String,
    pub object_name: String,
}