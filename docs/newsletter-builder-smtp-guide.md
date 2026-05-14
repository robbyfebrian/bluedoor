# Newsletter Builder & SMTP Guide

## Lokasi Newsletter Builder

Di panel admin Filament:

1. Buka `Admin`.
2. Masuk menu `Langganan Newsletter`.
3. Di halaman list, klik action header `Broadcast Newsletter`.
4. Isi field:
   - `Email Subject`
   - `Newsletter Content` (RichEditor/HTML content)

Newsletter akan dikirim ke subscriber dengan status `subscribed` dan `verified`.

## Konfigurasi SMTP

Atur `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_SCHEME=tls
MAIL_FROM_ADDRESS=no-reply@your-domain.com
MAIL_FROM_NAME="Blue Door Coffee"
```

Lalu jalankan:

```bash
php artisan config:clear
php artisan optimize:clear
```

## Verifikasi Pengiriman

1. Coba kirim broadcast ke subscriber uji.
2. Cek inbox dan folder spam.
3. Jika mailer masih `log` atau `array`, sistem akan menampilkan warning di action broadcast karena email tidak terkirim ke inbox nyata.
