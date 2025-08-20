// Sheet ID değiştiğinde çalışacak fonksiyon
async function fetchSheetNames() {
    const sheetIdInput = document.getElementById("sheetId");
    const sheetsNameContainer = document.getElementById("SheetsName");
    if (!sheetIdInput || !sheetsNameContainer) return;
    const sheetUrl = sheetIdInput.value.trim();
    if (!sheetUrl) return;
    
    try {
        const response = await fetch(`https://proxy.ckoglu.workers.dev/?url=${encodeURIComponent(sheetUrl)}`);
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const sheetNames = Array.from(tempDiv.querySelectorAll('.goog-inline-block .docs-sheet-tab-caption')).map(element => element.innerText.trim()).filter(name => name !== '');
        
        // Sheet isimlerini button olarak göster
        sheetsNameContainer.innerHTML = '';
        if (sheetNames.length > 0) {
            sheetNames.forEach(name => {
                const button = document.createElement('button');
                button.textContent = name;
                button.className = 'rbtn';
                button.onclick = function() {
                    openApiUrl(name); // Parametre ile çağır
                };
                sheetsNameContainer.appendChild(button);
            });
            
            // Tüm elementleri güncelle (ilk butonun değeri kullanılacak)
            updateAllElements();
            
        } else {
            sheetsNameContainer.textContent = 'Sheet isimleri bulunamadı';
        }
        
    } catch (error) {
        console.error('Hata:', error);
        sheetsNameContainer.textContent = 'Sheet isimleri yüklenirken hata oluştu';
    }
}

// Sheet ID inputuna event listener ekle
const sheetIdInput = document.getElementById("sheetId");
if (sheetIdInput) {
    sheetIdInput.addEventListener("input", function() {
        fetchSheetNames();
        updateAllElements(); 
    });
}

function getGitHubInfo() {
    const hostParts = location.hostname.split(".");
    let userName = "";
    let repo = "";

    if (hostParts.length >= 3 && hostParts[1] === "github" && hostParts[2] === "io") {
        userName = hostParts[0];
        const pathname = location.pathname.split("/").filter(Boolean);
        repo = pathname.length > 0 ? pathname[0] : "";
    } else {
        userName = "ckoglu";
        repo = "spreadsheets";
    }
    return { userName, repo };
}

function extractSheetIdFromUrl(url) {
    const startIndex = url.indexOf('/d/') + 3;
    const endIndex = url.indexOf('/', startIndex);
    if (endIndex === -1) {return url.substring(startIndex);}
    return url.substring(startIndex, endIndex);
}

// openApiUrl fonksiyonunu güncelle (sheetName parametresi alacak)
function openApiUrl(sheetNameParam = null) {
    const sheetIdInput = document.getElementById("sheetId");
    if (!sheetIdInput) {
        alert("Sheet ID bulunamadı!");
        return;
    }
    
    const sheetId = extractSheetIdFromUrl(sheetIdInput.value.trim());
    let sheetNameValue;
    
    if (sheetNameParam) {
        // Eğer parametre olarak sheet name geldiyse onu kullan
        sheetNameValue = sheetNameParam;
        const sheetNameInput = document.getElementById('sheetName');
        if (sheetNameInput) {
            sheetNameInput.value = sheetNameValue;
        }
        updateAllElements();
    } else {
        // Yoksa inputtan al (eğer varsa)
        const sheetNameInput = document.getElementById("sheetName");
        sheetNameValue = sheetNameInput ? sheetNameInput.value.trim() : "";
    }
    
    if (!sheetId || !sheetNameValue) {
        alert("Lütfen Sheet ID ve Sheet Name giriniz.");
        return;
    }
    
    const { userName, repo } = getGitHubInfo();
    if (!userName || !repo) {
        alert("Geçerli GitHub Pages ortamında çalıştırılmıyor!");
        return;
    }
    
    window.open(`https://${repo}.${userName}.workers.dev/${sheetId}/${sheetNameValue}?`, "_blank");
}

// Ortak güncelleme fonksiyonu
function updateAllElements() {
    const sheetIdInput = document.getElementById("sheetId");
    const sheetIdValue = sheetIdInput ? extractSheetIdFromUrl(sheetIdInput.value.trim()) : "";
    
    // sheetNameValue değerini SheetsName içindeki ilk butondan al
    const sheetsNameContainer = document.getElementById("SheetsName");
    let sheetNameValue = "";
    
    if (sheetsNameContainer && sheetsNameContainer.querySelector('button.rbtn')) {
        // İlk butonun innerText değerini al
        sheetNameValue = sheetsNameContainer.querySelector('button.rbtn').innerText.trim();
        // sheetName input alanını da güncelle (eğer varsa)
        const sheetNameInput = document.getElementById("sheetName");
        if (sheetNameInput) {
            sheetNameInput.value = sheetNameValue;
        }
    } else {
        // Eğer buton yoksa input alanından al (eğer varsa)
        const sheetNameInput = document.getElementById("sheetName");
        if (sheetNameInput) {
            sheetNameValue = sheetNameInput.value.trim();
        }
    }
    
    // tüm .example code elementlerini güncelle
    const codeElements = document.querySelectorAll('.example code');
    codeElements.forEach(stringEl => {
        const originalExample = stringEl.getAttribute('data-original') || stringEl.textContent;
        if (!stringEl.hasAttribute('data-original')) {stringEl.setAttribute('data-original', originalExample);}
        let updatedText = originalExample;
        if (sheetIdValue) {updatedText = updatedText.replace(/\[SHEET_ID\]|sheetId/g, sheetIdValue);}
        if (sheetNameValue) {updatedText = updatedText.replace(/\[SHEET_NAME\]|sheetName/g, sheetNameValue);}
        stringEl.textContent = updatedText;
    });
    
    // prefix elementlerini güncelle
    const prefixElements = document.querySelectorAll('[id^="prefix"]');
    prefixElements.forEach(element => {
        const originalText = element.getAttribute('data-original') || element.textContent;
        if (!element.hasAttribute('data-original')) {element.setAttribute('data-original', originalText);}
        let updatedText = originalText;
        if (sheetIdValue) {updatedText = updatedText.replace(/\[SHEET_ID\]/g, sheetIdValue);}
        if (sheetNameValue) {updatedText = updatedText.replace(/\[SHEET_NAME\]/g, sheetNameValue);}
        element.textContent = updatedText;
    });
}

window.addEventListener("load", async () => {
    let newUrl;
    if (location.pathname.endsWith("index.html")) {
        newUrl = `${location.origin}${location.pathname.replace(/index\.html$/, '')}`;
    } else if (location.pathname.endsWith('/')) {
        newUrl = `${location.origin}${location.pathname}`;
    } else {
        newUrl = `${location.origin}${location.pathname}/`;
    }
    history.replaceState({}, "", newUrl);

    const { userName, repo } = getGitHubInfo();
    const prefixUrl = `https://${repo}.${userName}.workers.dev/`;

    // prefix alanını güncelle
    const prefixElement = document.getElementById('prefix');
    if (prefixElement) {
        prefixElement.textContent = `${prefixUrl}[SHEET_ID]/[SHEET_NAME]?params`;
    }

    // sayfadaki tüm .example içindeki <code> etiketlerini güncelle
    document.querySelectorAll(".example code").forEach(el => {
        el.innerText = el.innerText.replace(/https:\/\/api\.example\.com\//g, prefixUrl);
    });

    // Orijinal değerleri sakla ve ilk güncellemeyi yap
    document.querySelectorAll('.example code, [id^="prefix"]').forEach(el => {
        if (!el.hasAttribute('data-original')) {
            el.setAttribute('data-original', el.textContent);
        }
    });
    
    // Input event listener'larını burada ekle (sayfa yüklendikten sonra)
    const sheetNameInput = document.getElementById("sheetName");
    if (sheetNameInput) {
        sheetNameInput.addEventListener("input", updateAllElements);
    }
    
    updateAllElements(); // Sayfa yüklendiğinde bir kere çalıştır
});
