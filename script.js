document.addEventListener('DOMContentLoaded', () => {

    // 1. EFEK KETIK PADA JOB TITLE
    const jobTitleElement = document.querySelector('.job-title');
    const titles = ["Programmer", "Front-end Developer"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            jobTitleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            jobTitleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800); // Waktu jeda saat teks selesai diketik
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeEffect, 400);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    typeEffect();


    // 2. SALIN KONTAK SAAT DIKLIK (CLICK TO COPY)
    const contactItems = document.querySelectorAll('.contact-section ul li');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'Klik untuk menyalin';

        item.addEventListener('click', () => {
            // Mengambil teks saja tanpa emoji
            const textToCopy = item.textContent.replace(/[\u1F600-\u1F6FF\u2600-\u26FF\u2700-\u27BF]/g, '').trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Berhasil menyalin: ${textToCopy}`);
            });
        });
    });

    // Fungsi Pop-up Notifikasi (Toast)
    function showToast(message) {
        let toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2200);
    }


    // 3. DARK MODE TOGGLE (TOMBOL MELAYANG)
    const themeBtn = document.createElement('button');
    themeBtn.className = 'floating-btn theme-btn';
    themeBtn.innerHTML = '🌙 Dark Mode';
    document.body.appendChild(themeBtn);

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });


    // 4. TOMBOL CETAK / SAVE AS PDF
    const printBtn = document.createElement('button');
    printBtn.className = 'floating-btn print-btn';
    printBtn.innerHTML = '🖨️ Cetak CV';
    document.body.appendChild(printBtn);

    printBtn.addEventListener('click', () => {
        window.print();
    });

});

// 5. FITUR TOMBOL FULLSCREEN INTERAKTIF
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'floating-btn fullscreen-btn';
    fullscreenBtn.innerHTML = '⛶ Fullscreen';
    document.body.appendChild(fullscreenBtn);

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            // Masuk ke mode Fullscreen
            document.documentElement.requestFullscreen().catch(err => {
                showToast(`Gagal masuk mode Fullscreen: ${err.message}`);
            });
        } else {
            // Keluar dari mode Fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Mengubah label tombol secara otomatis saat status Fullscreen berubah
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '🗗 EXIT';
        } else {
            fullscreenBtn.innerHTML = '⛶ Fullscreen';
        }
    });