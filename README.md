# LGS Action - Eğitim Platformu

Django tabanlı eğitim içerikleri sunma platformu.

## 🚀 Özellikler

- **Matematik Modülü:**
  - Karekök Çarpma/Bölme İşlemleri
  - Karekök a√b Formülü (düzeltildi ✅)
  - Ondalık İfadeler ve Gerçek Sayılar (yeni ✨)

## 📦 Kurulum

```powershell
# Sanal ortam oluştur
python -m venv venv

# Sanal ortamı aktifleştir (Windows)
.\venv\Scripts\activate

# Bağımlılıkları yükle
pip install django

# Veritabanı migration
python manage.py migrate

# Sunucuyu başlat
python manage.py runserver
```

## 🛠️ Geliştirme

### Yeni Sayfa Ekleme

1. `lgsweb/urls.py` → Route ekle
2. `lgsweb/views.py` → View fonksiyonu yaz
3. `lgsweb/templates/` → HTML şablonu oluştur

### Teknolojiler

- Django 5.x
- KaTeX (matematik formülleri)
- Vanilla JavaScript
- SQLite

## 📝 Son Güncellemeler

- ✅ `karekok_akokb.html` tekrar eden kodlar temizlendi
- ✅ `karekok_ondalik.html` dropdown sıralama eklendi
- ✅ JavaScript syntax hataları düzeltildi

## 📄 Lisans

Eğitim amaçlı proje.
