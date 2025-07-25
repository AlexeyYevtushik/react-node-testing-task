FROM mcr.microsoft.com/playwright:v1.54.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=optional

COPY . .
RUN chown -R pwuser:pwuser /app

USER pwuser

CMD ["sh", "-c", "npm run test:all ; echo '=== tests finished ===' ; tail -f /dev/null"]