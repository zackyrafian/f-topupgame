# Gunakan image node sebagai base image
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Copy package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Hapus cache npm dan install dependencies
RUN npm cache clean --force && npm install

# Copy semua file dari direktori kerja host ke direktori kerja container
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Expose port yang akan digunakan
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]
