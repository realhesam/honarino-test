use validator::Validate;

#[derive(Validate)]
pub struct CreateUserDto {
    #[validate(length(min = 1))]
    pub name: String,

    #[validate(email)]
    pub email: String,

    #[validate(length(min = 3))]
    pub username: String,

    #[validate(length(min = 8))]
    pub password: String,
}

#[derive(Validate)]
pub struct UpdateUserDto {
    #[validate(length(min = 1))]
    pub name: String,

    #[validate(email)]
    pub email: String,

    #[validate(length(min = 3))]
    pub username: String,

    pub password: Option<String>,

    #[validate(length(min = 1, max = 255))]
    pub profile: String,

    #[validate(length(min = 11, max = 11))]
    pub phone: String,
    
    #[validate(length(min = 3, max = 255))]
    pub address: String,
}
