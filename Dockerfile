FROM --platform=linux/arm64/v8 debian:bookworm-slim
WORKDIR /app
# on copie le binaire tel quel et on lui donne les droits d'exécution
COPY --chmod=755 run /app/run
EXPOSE 5000
CMD ["/app/run"]
