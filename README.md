# 📊 Google Sheets to REST API

Bu sistem, Google Sheets tablolarınızı tam özellikli bir REST API'ye dönüştürür. Çeşitli filtreleme, sıralama, arama ve sayfalama yetenekleri sunar.



## 🚀 Temel Kullanım

API'ye erişim için temel URL yapısı aşağıdaki gibidir:

`https://spreadsheets.ckoglu.workers.dev/[SHEET_ID]/[SHEET_NAME]?params`



## ⚙️ Kurulum

### Google Sheets Belgesi Oluşturun:
Verilerinizi **[Google Sheets](https://docs.google.com/spreadsheets/u/0/)** üzerinden oluşturun veya yönetin.

### Paylaşım Ayarlarını Yapılandırın:
Verilerin JSON formatında çekilebilmesi için aşağıdaki iki ayarı belgeniz için yapılandırmanız gerekmektedir:

1.  **Genel Erişimi Açın:**
    Dosya -> Paylaş -> Başkalarıyla paylaş -> Genel erişim -> Bağlantıya sahip olan herkes olarak ayarlayın.

2.  **Web'de Yayınla:**
    Dosya -> Paylaş -> Web'de yayınla -> Yayınla butonuna tıklayın. (Tüm dokümanı yayınlamanız yeterlidir).



## 📚 Parametre Referansı

### Sütun İşlemleri

| Parametre | Açıklama                            | Örnek              |
| :-------- | :------------------------------------- | :------------------- |
| `sutunlar`  | Tüm sütun isimlerini JSON listesi olarak döner. | `?sutunlar=1`        |
| `sutun`   | Sadece belirtilen sütunları gösterir (virgülle ayırarak). | `?sutun=<sutun_ad>,<sutun_ad>` |

### Özel Filtreleme Parametreleri

| Parametre | Açıklama                        | Örnek                           |
| :-------- | :--------------------------------- | :-------------------------------- |
| `date`    | Tarih sütununda filtreleme yapar. | `?date=<sutun_ad>:03.01.2025`            |
| `num`     | Sayısal sütunda filtreleme yapar. | `?num=<sutun_ad>:30`                       |
| `tag`     | Belirtilen sütundaki etiketlere göre filtreleme yapar. | `?tag=<sutun_ad>:<veri>`                |
| `time`    | Saat sütununda filtreleme yapar.| `?time=<sutun_ad>:<saat>`                  |

#### Date Parametre Değerleri

| Value              | Açıklama                                  | Örnek                       |
| :----------------- | :------------------------------------------- | :---------------------------- |
| `bugun`            | Bugünkü kayıtları getirir                | `date=<sutun_ad>:bugun`            |
| `dun`              | Dünkü kayıtları getirir              | `date=<sutun_ad>:dun`              |
| `hafta`            | Son 1 haftadaki kayıtları getirir      | `date=<sutun_ad>:hafta`            |
| `ay`               | Son 1 aydaki kayıtları getirir     | `date=<sutun_ad>:ay`               |
| `yil`              | Son 1 yıldaki kayıtları getirir      | `date=<sutun_ad>:yil`              |
| `yeni`             | En yeni kayıtları sıralar                 | `date=<sutun_ad>:yeni`             |
| `eski`             | En eski kayıtları sıralar                | `date=<sutun_ad>:eski`             |
| `DD.MM.YYYY`       | Belirli bir tarihten itibaren kayıtları getirir | `date=<sutun_ad>:<GG.AA.YYYY>`         |
| `DD.MM.YYYY:DD.MM.YYYY` | Tarih aralığındaki kayıtları getirir       | `date=<sutun_ad>:<GG.AA.YYYY>:<GG.AA.YYYY>` |
| `*YYYY*`           | Sadece YYYY yılındaki kayıtları getirir | `date=<sutun_ad>:*<YYYY>*`           |
| `*YYYY`            | YYYY yılından önceki kayıtları getirir | `date=<sutun_ad>:*<YYYY>`            |
| `YYYY*`            | YYYY yılından sonraki kayıtları getirir  | `date=<sutun_ad>:<YYYY>*`            |

#### Num Parametre Değerleri

| Value     | Açıklama                      | Örnek                   |
| :-------- | :------------------------------- | :------------------------ |
| `kucuk`   | Küçükten büyüğe sıralar  | `num=<sutun_ad>:kucuk`         |
| `buyuk`   | Büyükten küçüğe sıralar  | `num=<sutun_ad>:buyuk`         |
| `ortalama`| Sütunun ortalamasını hesaplar | `num=<sutun_ad>:ortalama`      |
| `toplam`  | Sütunun toplamını hesaplar  | `num=<sutun_ad>:toplam`        |
| `X:Y`     | İki sayı arasındaki değerleri listeler  | `num=<sutun_ad>:<sayi>:<sayi>`          |
| `X`       | sadece X sayısı değerlerini listeler     | `num=<sutun_ad>:*<sayi>*`           |
| `*X`      | X sayısından küçük değerleri listeler | `num=<sutun_ad>:*<sayi>`           |
| `X*`      | X sayısından büyük değerleri listeler | `num=<sutun_ad>:<sayi>*`            |

#### Tag Parametre Değerleri

| Value    | Açıklama                         | Örnek                    |
| :------- | :---------------------------------- | :------------------------- |
| `<etiket>` | Belirtilen etikete sahip kayıtları getirir | `tag=<sutun_ad>:<veri>`   |

#### Time Parametre Değerleri

| Value | Açıklama                           | Örnek             |
| :---- | :------------------------------------ | :------------------ |
| `yeni`| En yeni saatleri sıralar            | `time=<sutun_ad>:yeni`    |
| `eski`| En eski saatleri sıralar            | `time=<sutun_ad>:eski`    |
| `HH:MM`| Belirli bir saatten itibaren kayıtları getirir | `time=<sutun_ad>:<SS:DD>`   |
| `HH`  | Belirli bir saat içeren kayıtları getirir | `time=<sutun_ad>:<SS>`      |

### Doğrudan Sütun Filtreleme

| Parametre     | Açıklama                                           | Örnek           |
| :------------ | :---------------------------------------------------- | :---------------- |
| `[sutun_adi]` | Herhangi bir sütun adını parametre olarak kullanarak o sütunda doğrudan filtreleme yapar | `?<sutun_ad>=<veri>`    |

### Arama ve Sıralama

| Parametre | Açıklama                                       | Örnek             |
| :-------- | :------------------------------------------------ | :------------------ |
| `ara`     | Tüm sütunlarda metin araması yapar. (*) kullanılabilir | `?ara=*<veri>`          |
| `sirala`  | Sonuçları Z-A doğru sıralar                       | `?sirala=<sutun_ad>:az`  |
| `sirala`  | Sonuçları A-Z doğru sıralar                       | `?sirala=<sutun_ad>:za`  |

### Sayfalama

| Parametre | Açıklama                                   | Örnek           |
| :-------- | :-------------------------------------------- | :---------------- |
| `limit`   | Sayfa başına maksimum kayıt sayısı  | `?limit=10`       |
| `sayfa`   | Getirilecek sayfa numarası        | `?sayfa=2`        |
| `sayfa`   | ilk sayfa                     | `?sayfa=ilk`      |
| `sayfa`   | Son sayfa                      | `?sayfa=son`      |

### Diğer Parametreler

| Parametre | Açıklama                                       | Örnek       |
| :-------- | :------------------------------------------------ | :------------ |
| `debug`   | Yanıta hata ayıklama bilgilerini ekle       | `?debug=1`    |
| `random`  | Rastgele kayıt                        | `?random=true`|
| `save`    | Veriyi (csv, xml, json) formatlarda kaydet | `?save=csv`   |



## ✨ Örnekler

### Temel Liste
Tüm verileri listeler

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName`

### Filtreli Liste
yazar sütunu "Ahmet" olan ve tarih sütununda "2024" geçen kayıtları listeler.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?yazar=Ahmet&tarih=*2024*`

### Sıralı ve Sayfalanmış Liste
En yeni kayıtlara göre sıralanmış, sayfa başına 5 kayıt gösterilen listenin 2. sayfasını getirir.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?date=tarih:yeni&limit=5&sayfa=2`

### Özel Sütunlarla Arama
Tüm sütunlarda "js" geçen kayıtların sadece baslik ve tarih sütunlarını gösterir.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?sutun=baslik,tarih&ara=*js`

### Etiket Filtreli Liste
etiket sütununda "react" etiketine sahip kayıtları listeler.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?tag=etiket:react`

### Sayısal Filtreleme
Fiyatı 100-200 arasındaki ürünleri küçükten büyüğe sıralar.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?num=fiyat:100:200&num=fiyat:kucuk`

### Rastgele Kayıt
Rastgele bir kayıt getirir.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?random=true`

### CSV İndirme
Verileri CSV formatında indirir.

`https://spreadsheets.ckoglu.workers.dev/sheetId/sheetName?save=csv`



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

```json
{
  "ortalama": 25.5,
  "toplam": 255
}
```

## 🤝 Katkıda Bulunma

Katkılarınız için GitHub Repo sayfasını ziyaret edebilirsiniz.

## 🔗 Sayfayı Gör

[Spreadsheets API](https://ckoglu.github.io/spreadsheets/)

## 📄 Lisans

[MIT License](https://opensource.org/licenses/MIT)
