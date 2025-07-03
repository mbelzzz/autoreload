addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const embedUrl = url.searchParams.get('play');

  // Jika parameter 'play' tidak ada, tampilkan pesan error
  if (!embedUrl) {
      return new Response(
          `<html>
              <head>
                  <title>Video Player</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          height: 100vh;
                          margin: 0;
                          background-color: #f8f9fa;
                      }
                      .message {
                          color: #333;
                          font-size: 20px;
                      }
                  </style>
              </head>
              <body>
                  <div class="message">URL embed tidak ditemukan. Pastikan parameter <b>?play=</b> sudah benar.</div>
              </body>
          </html>`,
          { headers: { 'Content-Type': 'text/html' } }
      );
  }

  // Template HTML
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nonton Film</title>
      <link rel='icon' type='img/png' href='https://img001.prntscr.com/file/img001/Ybvm-rGpTMOePKDZrVk_nQ.png' sizes='32x32'>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f9;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              box-sizing: border-box;
          }
          .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              max-width: 1200px;
              margin: 20px auto;
          }
          .ad-container-top, .ad-container-bottom {
              width: 728px;
              height: 90px;
              margin: 10px auto; /* Rata tengah iklan */
          }
          .player-wrapper {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              width: 100%;
              position: relative;
          }
          .ad-side {
              width: 160px;
              height: 600px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 10px;
          }
          iframe {
              width: 90%;
              max-width: 800px;
              height: 450px;
              border: none;
          }
          .ad-container-bottom {
              margin-top: 5px; /* Iklan bawah lebih rapat ke player */
          }
          @media (max-width: 768px) {
              .ad-side {
                  display: none; /* Sembunyikan iklan sisi kiri-kanan pada layar kecil */
              }
              iframe {
                  height: 300px; /* Sesuaikan tinggi player untuk layar kecil */
              }
              .ad-container-top, .ad-container-bottom {
                  width: 100%;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Iklan 728x90 (Atas) -->
          <div class="ad-container-top">
              <script type="text/javascript">
                  atOptions = {
                      'key' : '6c7081d577ca88316b5441dd28593b92',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                  };
              </script>
              <script type="text/javascript" src="//luckilygelatine.com/6c7081d577ca88316b5441dd28593b92/invoke.js"></script>
          </div>

          <div class="player-wrapper">
              <!-- Iklan 160x600 (Sisi Kiri) -->
              <div class="ad-side">
                  <script type="text/javascript">
                      atOptions = {
                          'key' : '859bae4a1b11945921dd52c78e1458e6',
                          'format' : 'iframe',
                          'height' : 600,
                          'width' : 160,
                          'params' : {}
                      };
                  </script>
                  <script type="text/javascript" src="//luckilygelatine.com/859bae4a1b11945921dd52c78e1458e6/invoke.js"></script>
              </div>

              <!-- Player Embed -->
              <iframe src="${embedUrl}" allowfullscreen></iframe>

              <!-- Iklan 160x600 (Sisi Kanan) -->
              <div class="ad-side">
                  <script type="text/javascript">
                      atOptions = {
                          'key' : '859bae4a1b11945921dd52c78e1458e6',
                          'format' : 'iframe',
                          'height' : 600,
                          'width' : 160,
                          'params' : {}
                      };
                  </script>
                  <script type="text/javascript" src="//luckilygelatine.com/859bae4a1b11945921dd52c78e1458e6/invoke.js"></script>
              </div>
          </div>

          <!-- Iklan 728x90 (Bawah) -->
          <div class="ad-container-bottom">
              <script type="text/javascript">
                  atOptions = {
                      'key' : '6c7081d577ca88316b5441dd28593b92',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                  };
              </script>
              <script type="text/javascript" src="//luckilygelatine.com/6c7081d577ca88316b5441dd28593b92/invoke.js"></script>
          </div>
      </div>
  </body>
  </html>
  `;

  return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
  });
}
