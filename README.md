# Websiter.id — AI Summarizer

## Menjalankan
1. Instal Node.js versi LTS.
2. Ekstrak ZIP dan buka terminal di folder `websiter-ai`.
3. Jalankan `npm install`.
4. Atur `OPENAI_API_KEY` sebagai environment variable server (jangan taruh API key di HTML).
   - Windows PowerShell: `$env:OPENAI_API_KEY="API_KEY_KAMU"`
   - macOS/Linux: `export OPENAI_API_KEY="API_KEY_KAMU"`
5. Jalankan `npm start`, lalu buka `http://localhost:3000`.
6. Opsional: atur `OPENAI_MODEL` ke model yang tersedia di akun API.

## Penting
- HTML statis saja tidak bisa menjalankan AI secara aman; aplikasi ini menyertakan backend Node.js agar API key tetap di server.
- Saat ini pengguna perlu menempel transkrip/teks. Kolom URL hanya menyimpan referensi, belum mengambil transkrip YouTube otomatis.
- Agar bisa merangkum hanya dari URL YouTube, perlu ditambahkan integrasi pengambil transkrip yang mematuhi aturan dan ketersediaan transkrip YouTube.
- Untuk hosting publik, simpan API key sebagai secret dan pertimbangkan rate limit/pembatasan penggunaan.
