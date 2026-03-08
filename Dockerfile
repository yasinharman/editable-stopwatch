# --- 1. Aşama: Build (İnşa) ---
FROM node:20-alpine as builder

# Konteyner içindeki çalışma klasörümüz
WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Projenin geri kalan tüm kodlarını kopyala
COPY . .

# Projeyi yayına hazır hale getir (dist klasörü oluşur)
RUN npm run build

# --- 2. Aşama: Serve (Yayın) ---
FROM nginx:alpine

# Nginx'in varsayılan karşılama sayfasını sil
RUN rm -rf /usr/share/nginx/html/*

# İlk aşamada oluşan 'dist' klasörünü Nginx'in yayın klasörüne kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# 80 portunu dışarıya aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]