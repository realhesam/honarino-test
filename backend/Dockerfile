# Stage 0: Cache dependencies
FROM rust:alpine as chef
WORKDIR /app

RUN apk add --no-cache musl-dev postgresql-client openssl-dev openssl-libs-static

COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release || true
RUN rm -rf src

COPY src ./src
COPY migrations ./migrations
RUN cargo build --release

FROM alpine:latest
RUN apk add --no-cache libpq
COPY --from=chef /app/target/release/server /usr/local/bin/server
EXPOSE 8000
CMD ["server"]
