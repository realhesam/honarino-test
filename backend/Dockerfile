FROM rust:alpine AS builder

RUN apk add --no-cache musl-dev postgresql-client openssl-dev openssl-libs-static pkgconfig

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir -p src/bin \
 && echo 'fn main() { println!("dummy"); }' > src/main.rs \
 && cargo build --release

COPY src ./src
COPY migrations ./migrations ./migrations/

RUN cargo build --release --locked

FROM alpine:latest
RUN apk add --no-cache libpq
COPY --from=builder /app/target/release/server /usr/local/bin/server
EXPOSE 8000
CMD ["server"]