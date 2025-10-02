FROM --platform=linux/arm64/v8 debian:bookworm-slim
WORKDIR /app
COPY run /app/run
# normalise fin de ligne Windows + rend exécutable
RUN sed -i 's/\r$//' /app/run && chmod +x /app/run
EXPOSE 5000
CMD ["/app/run"]
