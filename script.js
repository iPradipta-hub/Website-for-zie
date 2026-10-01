function enterWebsite() {

    // Efek keluar sebelum pindah halaman
    document.body.classList.add("page-exit");

    // Tunggu animasi selesai
    setTimeout(function () {

        window.location.href = "story.html";

    }, 500);

}

const exitStyle = document.createElement("style");

exitStyle.innerHTML = `
    .page-exit {
        animation: pageExit 0.5s ease forwards;
    }

    @keyframes pageExit {
        from {
            opacity: 1;
            transform: scale(1);
        }

        to {
            opacity: 0;
            transform: scale(1.03);
        }
    }
`;

document.head.appendChild(exitStyle);


window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});



let isEntering = false;

const enterButton = document.querySelector(".enter-btn");

if (enterButton) {

    enterButton.addEventListener("click", function () {

        if (isEntering) {
            return;
        }

        isEntering = true;

        enterButton.style.pointerEvents = "none";

    });

}



function openSurprise() {

    const intro =
        document.getElementById("surpriseIntro");

    const surprise =
        document.getElementById("surpriseContent");

    if (!intro || !surprise) {
        return;
    }


    intro.style.animation =
        "pageExit 0.6s ease forwards";


    setTimeout(function () {

        intro.style.display = "none";

        surprise.style.display = "block";

        createConfetti();

    }, 550);

}

function createConfetti() {

    const container =
        document.getElementById("confetti");

    if (!container) {
        return;
    }


    const pieces = 35;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement("span");


        piece.classList.add(
            "confetti-piece"
        );


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        piece.style.animationDuration =
            2.5 +
            Math.random() * 2 +
            "s";


        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        container.appendChild(piece);

    }

}

 

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


if (bgMusic && musicButton) {

    // Ambil status musik sebelumnya
    const savedTime =
        localStorage.getItem("musicTime");

    const savedPlaying =
        localStorage.getItem("musicPlaying");


    // Lanjutkan dari posisi terakhir
    if (savedTime) {
        bgMusic.currentTime =
            parseFloat(savedTime);
    }


    // Update tampilan tombol
    function updateMusicButton() {

        if (bgMusic.paused) {

            musicButton.classList.remove(
                "playing"
            );

            musicButton.innerHTML = "♪";

        } else {

            musicButton.classList.add(
                "playing"
            );

            musicButton.innerHTML = "♫";

        }

    }


    // Play / Pause
    window.toggleMusic = function () {

        if (bgMusic.paused) {

            bgMusic.play()
                .then(function () {

                    localStorage.setItem(
                        "musicPlaying",
                        "true"
                    );

                    updateMusicButton();

                })
                .catch(function () {

                    console.log(
                        "Musik belum bisa diputar."
                    );

                });

        } else {

            bgMusic.pause();

            localStorage.setItem(
                "musicPlaying",
                "false"
            );

            localStorage.setItem(
                "musicTime",
                bgMusic.currentTime
            );

            updateMusicButton();

        }

    };


    // Simpan posisi lagu secara berkala
    bgMusic.addEventListener(
        "timeupdate",
        function () {

            localStorage.setItem(
                "musicTime",
                bgMusic.currentTime
            );

        }
    );


    // Sebelum pindah halaman
    window.addEventListener(
        "beforeunload",
        function () {

            localStorage.setItem(
                "musicTime",
                bgMusic.currentTime
            );

        }
    );


    // Coba lanjutkan musik
    // jika sebelumnya memang sedang menyala
    if (savedPlaying === "true") {

        bgMusic.play()
            .then(function () {

                updateMusicButton();

            })
            .catch(function () {

                // Browser bisa memblokir autoplay.
                // User cukup tekan tombol musik.
                updateMusicButton();

            });

    } else {

        updateMusicButton();

    }

}