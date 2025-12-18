// Cümlenin ögeleri interaktif alıştırma scripti

document.addEventListener('DOMContentLoaded', function() {
    // 1. Cümle (eski)
    const cumle1 = [
        {text: 'Dün sabah', type: 'zarf'},
        {text: 'annem', type: 'ozne'},
        {text: 'bana', type: 'dtumlec'},
        {text: 'güzel bir hikaye', type: 'nesne'},
        {text: 'anlattı', type: 'yuklem'}
    ];
    // 2. Cümle (yeni)
    const cumle2 = [
        {text: 'Dün akşam', type: 'zarf'},
        {text: 'Ahmet', type: 'ozne'},
        {text: 'kütüphanede', type: 'dtumlec'},
        {text: 'eski kitapları', type: 'nesne'},
        {text: 'dikkatlice', type: 'zarf'},
        {text: 'inceledi', type: 'yuklem'}
    ];

    // 3. Cümle (eklenen)
    const cumle3 = [
        {text: 'bir gün', type: 'zarf'},
        {text: 'adanın sahiline', type: 'dtumlec'},
        {text: 'gıda yüklü bir tekne', type: 'ozne'},
        {text: 'demirledi', type: 'yuklem'}
    ];

    // 4. Cümle (eklenen)
    const cumle4 = [
        {text: 'Nasrettin Hoca fıkralarını', type: 'nesne'},
        {text: 'bugüne kadar', type: 'zarf'},
        {text: 'birçok edebiyat tarihçisi', type: 'ozne'},
        {text: 'incelemiştir', type: 'yuklem'}
    ];

    // Ortak adımlar
    const adimlar = [
        {
            label: 'Yüklemi bul:',
            baloncuklar: [],
            type: 'yuklem',
            dogruMesaj: 'Doğru! Bu bölüm: Yüklem',
            baloncukRenk: ''
        },
        {
            label: 'Özneyi bul:',
            baloncuklar: ['KİM?', 'NE?'],
            type: 'ozne',
            dogruMesaj: 'Doğru! Bu bölüm: Özne',
            baloncukRenk: '#ffb74d'
        },
        {
            label: 'Nesneyi bul:',
            baloncuklar: ['NEYİ?', 'KİMİ?'],
            type: 'nesne',
            dogruMesaj: 'Doğru! Bu bölüm: Nesne',
            baloncukRenk: '#e53935'
        },
        {
            label: 'Dolaylı tümleci (yer tamlayıcısı) bul:',
            baloncuklar: [
                'KİME?', 'KİMDE?', 'KİMDEN?',
                'NEYE?', 'NEYDE?', 'NEYDEN?',
                'NERE(Y)E?', 'NEREDE?', 'NEREDEN?'
            ],
            type: 'dtumlec',
            dogruMesaj: 'Doğru! Bu bölüm: Dolaylı Tümleç',
            baloncukRenk: '#00838f'
        },
        {
            label: 'Zarf tümlecini bul:',
            baloncuklar: [
                'NE ZAMAN?', 'NASIL?', 'NİÇİN?', 'NİYE?', 'NEDEN?',
                'NE KADAR?', 'NE ŞEKİLDE?', 'NE İLE?', 'KİM İLE?', 'NEREYE?'
            ],
            type: 'zarf',
            dogruMesaj: 'Doğru! Bu bölüm: Zarf Tümleci',
            baloncukRenk: '#8e24aa'
        }
    ];

    // Her cümle için ayrı kutu oluştur
    function createAlistirmaBox(containerId, cumle) {
        const container = document.getElementById(containerId);
        if (!container) return;
        // Alanları oluştur
        container.innerHTML = `
            <div class="alistirma-box">
                <div class="soru-alani"></div>
                <div class="cumle-alani"></div>
                <div class="sonuc-alani"></div>
            </div>
        `;
        const soruAlani = container.querySelector('.soru-alani');
        const cumleDiv = container.querySelector('.cumle-alani');
        const sonucDiv = container.querySelector('.sonuc-alani');
        let adimIndex = 0;
        function renderAdim() {
            // Soru başlığı ve baloncuklar
            if (soruAlani) {
                const adim = adimlar[adimIndex];
                // Eğer cümlede bu adımın öğesi yoksa otomatik olarak bir sonraki adıma geç
                const ogeVarMi = cumle.some(x => x.type === adim.type);
                if (!ogeVarMi) {
                    if (adimIndex < adimlar.length - 1) {
                        adimIndex++;
                        renderAdim();
                        return;
                    } else {
                        // Son adımda ise tebrik mesajı göster
                        if (sonucDiv) {
                            sonucDiv.innerHTML = 'Tebrikler! Tüm ögeleri doğru buldun.<br><button class="tekrar-btn" style="margin-top:18px; padding:8px 22px; border-radius:8px; background:#ffb74d; color:#232323; font-weight:bold; border:none; font-size:1.08em; cursor:pointer;">Tekrar bul</button>';
                            const tekrarBtn = container.querySelector('.tekrar-btn');
                            if (tekrarBtn) {
                                tekrarBtn.onclick = function() {
                                    adimIndex = 0;
                                    sonucDiv.textContent = '';
                                    renderAdim();
                                };
                            }
                        }
                        return;
                    }
                }
                soruAlani.innerHTML = `<span style="font-weight:bold; vertical-align:middle;">${adim.label}</span>`;
                if (adim.baloncuklar.length > 0) {
                    soruAlani.innerHTML += adim.baloncuklar.map(b=>
                        `<span style="display:inline-block; background:${adim.baloncukRenk}; color:#232323; border-radius:16px; padding:4px 14px; margin-left:10px; font-size:0.98em; font-weight:500; vertical-align:middle;">${b}</span>`
                    ).join('');
                }
            }
            // Cümle butonları
            cumleDiv.innerHTML = cumle.map((x, i) => {
                return `<button class="cumle-parca" data-index="${i}" style="border:none; background:#23293a; color:#fff; margin:0 2px; padding:2px 10px; border-radius:6px; font-size:1.1em; cursor:pointer;">${x.text}</button>`;
            }).join(' ');
            Array.from(cumleDiv.children).forEach((btn, i) => {
                btn.onclick = function() {
                    Array.from(cumleDiv.children).forEach(b => {
                        b.classList.remove('dogru', 'yanlis');
                    });
                    const oge = cumle[i];
                    if (oge.type === adimlar[adimIndex].type) {
                        btn.classList.add('dogru');
                        if (sonucDiv) {
                            sonucDiv.textContent = adimlar[adimIndex].dogruMesaj;
                            sonucDiv.style.color = '#43a047';
                        }
                        setTimeout(() => {
                            if (adimIndex < adimlar.length - 1) {
                                adimIndex++;
                                if (sonucDiv) sonucDiv.textContent = '';
                                renderAdim();
                            } else {
                                if (sonucDiv) {
                                    sonucDiv.innerHTML = 'Tebrikler! Tüm ögeleri doğru buldun.<br><button class="tekrar-btn" style="margin-top:18px; padding:8px 22px; border-radius:8px; background:#ffb74d; color:#232323; font-weight:bold; border:none; font-size:1.08em; cursor:pointer;">Tekrar bul</button>';
                                    const tekrarBtn = container.querySelector('.tekrar-btn');
                                    if (tekrarBtn) {
                                        tekrarBtn.onclick = function() {
                                            adimIndex = 0;
                                            sonucDiv.textContent = '';
                                            renderAdim();
                                        };
                                    }
                                }
                            }
                        }, 900);
                    } else {
                        btn.classList.add('yanlis');
                        if (sonucDiv) {
                            sonucDiv.textContent = 'Yanlış, tekrar dene.';
                            sonucDiv.style.color = '#e53935';
                        }
                    }
                };
            });
        }
        renderAdim();
    }

    // Sayfada üç kutu için alan oluştur
    const main = document.getElementById('main-alistirma');
    if (main) {
        main.innerHTML = `
            <div id="alistirma1"></div>
            <div id="alistirma2" style="margin-top:32px;"></div>
            <div id="alistirma3" style="margin-top:32px;"></div>
            <div id="alistirma4" style="margin-top:32px;"></div>
        `;
        createAlistirmaBox('alistirma1', cumle1);
        createAlistirmaBox('alistirma2', cumle2);
        createAlistirmaBox('alistirma3', cumle3);
        createAlistirmaBox('alistirma4', cumle4);
    }
});
