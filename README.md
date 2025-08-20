# 📊 Google Sheets to REST API

Bu sistem, Google Sheets tablolarınızı tam özellikli bir REST API'ye dönüştürür. Çeşitli filtreleme, sıralama, arama ve sayfalama yetenekleri sunar.

## 🚀 Temel Kullanım

API'ye erişim için temel URL yapısı aşağıdaki gibidir:

```
https://spreadsheets.ckoglu.workers.dev/[SHEET_ID]/[SHEET_NAME]?params
```

---

## ⚙️ Kurulum

1.  **Google Sheets Belgesi Oluşturun:**
    Verilerinizi [Google Sheets](https://docs.google.com/spreadsheets/u/0/) üzerinden oluşturun veya yönetin.

2.  **Paylaşım Ayarlarını Yapılandırın:**
    Verilerin JSON formatında çekilebilmesi için aşağıdaki iki ayarı belgeniz için yapılandırmanız gerekmektedir.

    * **Genel Erişimi Açın:**
        `Dosya` -> `Paylaş` -> `Başkalarıyla paylaş` -> `Genel erişim` -> **`Bağlantıya sahip olan herkes`** olarak ayarlayın.

    * **Web'de Yayınlayın:**
        `Dosya` -> `Paylaş` -> `Web'de yayınla` -> **`Yayınla`** butonuna tıklayın. (Tüm dokümanı yayınlamanız yeterlidir).

---

## 📚 Parametre Referansı

### Sütun İşlemleri

| Parametre | Açıklama | Örnek |
| :--- | :--- | :--- |
| `sutunlar` | Tüm sütun isimlerini JSON listesi olarak döner. | `?sutunlar=1` |
| `sutun` | Sadece belirtilen sütunları gösterir (virgülle ayırarak). | `?sutun=baslik,yazar` |

### Filtreleme Parametreleri

| Parametre | Açıklama | Örnek |
| :--- | :--- | :--- |
| `date` | Tarih sütununda filtreleme yapar. (`yeni`, `eski`, `dd.mm.yyyy`, `yyyy`) | `?date=tarih:03.01.2025` |
| `num` | yas sütununda filtreleme yapar. (`buyuk`, `kucuk`, `1`, `1*`, `*1*`, `*1`) | `?num=yas:30` |
| `tag` | Belirtilen sütundaki etiketlere göre filtreleme yapar. | `?tag=etiket:nodejs` |
| `time` | Saat sütununda filtreleme yapar. (`hh:mm`) | `?time=saat:14:30` |
| `[sütun_adi]` | Herhangi bir sütun adını parametre olarak kullanarak o sütunda doğrudan filtreleme yapar. | `?yazar=Ahmet` |

### Arama ve Sıralama

| Parametre | Açıklama | Örnek |
| :--- | :--- | :--- |
| `ara` | Tüm sütunlarda metin araması yapar. Joker karakter (`*`) kullanılabilir. | `?ara=*js` |
| `sirala` | Sonuçları sıralama yönünü belirtir (`az` veya `za`). | `?sirala=az` |

### Sayfalama

| Parametre | Açıklama | Örnek |
| :--- | :--- | :--- |
| `limit` | Sayfa başına gösterilecek maksimum kayıt sayısını belirler. | `?limit=10` |
| `sayfa` | Getirilecek sayfa numarasını belirtir. | `?sayfa=2` |

### Diğer Parametreler

| Parametre | Açıklama | Örnek |
| :--- | :--- | :--- |
| `debug` | Yanıta hata ayıklama bilgilerini ekler. | `?debug=1` |

---

## ✨ Örnekler

**Temel Liste**
Tüm verileri listeler.
```
https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName
```

**Filtreli Liste**
`yazar` sütunu "Ahmet" olan ve `tarih` sütununda "2024" geçen kayıtları listeler.
```
https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?yazar=Ahmet&tarih=*2024)*
```

**Sıralı ve Sayfalanmış Liste**
En yeni kayıtlara göre sıralanmış, sayfa başına 5 kayıt gösterilen listenin 2. sayfasını getirir.
```
https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?sirala=yeni&limit=5&sayfa=2
```

**Özel Sütunlarla Arama**
Tüm sütunlarda "js" geçen kayıtların sadece `baslik` ve `tarih` sütunlarını gösterir.
```
https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?sutun=baslik,tarih&ara=*js
```

**Etiket Filtreli Liste**
`etiket` sütununda "react" etiketine sahip kayıtları listeler.
```
https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?tag=etiket:react
```

---

## 📄 JSON Yanıt Formatı

API'den dönen yanıt standart olarak aşağıdaki yapıda olacaktır:

```json
{
  "total": 100,
  "sayfa": 2,
  "limit": 10,
  "results": [
    {
      "head1": "value1",
      "head2": "value2"
    },
    {
      "head1": "value3",
      "head2": "value4"
    }
  ]
}
```

## 🤝 Katkıda Bulunma

Katkılarınız için GitHub Repo sayfasını ziyaret edebilirsiniz.

## 🔗 Sayfayı Gör

[Spreadsheets API](https://ckoglu.github.io/spreadsheets/)

## 📄 Lisans

[MIT License](https://opensource.org/licenses/MIT)
