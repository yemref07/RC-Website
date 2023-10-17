<template>
    <div class="b usiness-info-widget ls-widget ls-widget-of">
        <div class="widget-content">
          <div class="author-widget">
            <div class="author-box">
              <figure class="image">
                <img
                  src="https://cdn.rapp.com.tr/bcb320d2-c861-4619-bcf4-5f01d20ca240/logo/randevucenter.png"
                  alt=""
                />
              </figure>
              <h4 class="name">{{info.title}} <span class="icon icon-verified"></span></h4>
            </div>
          </div>
          <p>
            <button class="theme-btn btn-style-two btn-light" type="button" onclick="randevuForm()">
              <svg class="Pmm3mc svgBoyut" style="fill: currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                ></path>
              </svg>
              <span>Randevu Al</span>
            </button>
            <button class="theme-btn btn-style-two btn-light" type="button" onclick="messageForm()">
              <i class="far fa-envelope"></i>
              Mesaj Gönder
            </button>
            <button
              class="theme-btn btn-style-two btn-light"
              type="button"
              onclick="whatsappForm()"
            >
              <i class="fab fa-whatsapp"></i>
              Whatsapp
            </button>
          </p>

          <ul class="contact-info-list">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svgBoyut2"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <path
                    d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M11.613922,13.2130341 C11.1688026,13.6581534 10.4887934,13.7685037 9.92575695,13.4869855 C9.36272054,13.2054673 8.68271128,13.3158176 8.23759191,13.760937 L6.72658218,15.2719467 C6.67169475,15.3268342 6.63034033,15.393747 6.60579393,15.4673862 C6.51847004,15.7293579 6.66005003,16.0125179 6.92202169,16.0998418 L8.27584113,16.5511149 C9.57592638,16.9844767 11.009274,16.6461092 11.9783003,15.6770829 L15.9775173,11.6778659 C16.867756,10.7876271 17.0884566,9.42760861 16.5254202,8.3015358 L15.8928491,7.03639343 C15.8688153,6.98832598 15.8371895,6.9444475 15.7991889,6.90644684 C15.6039267,6.71118469 15.2873442,6.71118469 15.0920821,6.90644684 L13.4995401,8.49898884 C13.0544207,8.94410821 12.9440704,9.62411747 13.2255886,10.1871539 C13.5071068,10.7501903 13.3967565,11.4301996 12.9516371,11.8753189 L11.613922,13.2130341 Z"
                    fill="#0069ff"
                  ></path>
                </g>
              </svg>
              <a href="tel:905453470043"><span class="phoneformat">+(90) 545 347 0043</span> </a>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svgBoyut2"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <path
                    d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M11.613922,13.2130341 C11.1688026,13.6581534 10.4887934,13.7685037 9.92575695,13.4869855 C9.36272054,13.2054673 8.68271128,13.3158176 8.23759191,13.760937 L6.72658218,15.2719467 C6.67169475,15.3268342 6.63034033,15.393747 6.60579393,15.4673862 C6.51847004,15.7293579 6.66005003,16.0125179 6.92202169,16.0998418 L8.27584113,16.5511149 C9.57592638,16.9844767 11.009274,16.6461092 11.9783003,15.6770829 L15.9775173,11.6778659 C16.867756,10.7876271 17.0884566,9.42760861 16.5254202,8.3015358 L15.8928491,7.03639343 C15.8688153,6.98832598 15.8371895,6.9444475 15.7991889,6.90644684 C15.6039267,6.71118469 15.2873442,6.71118469 15.0920821,6.90644684 L13.4995401,8.49898884 C13.0544207,8.94410821 12.9440704,9.62411747 13.2255886,10.1871539 C13.5071068,10.7501903 13.3967565,11.4301996 12.9516371,11.8753189 L11.613922,13.2130341 Z"
                    fill="#0069ff"
                  ></path>
                </g>
              </svg>
              <a href="tel:905453470043"><span class="phoneformat">+(90) 545 347 0043</span> </a>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svgBoyut2"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <path
                    d="M5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z"
                    fill="#0069ff"
                  ></path>
                </g>
              </svg>
              <a href="mailto:info@goviva.com.tr">info@goviva.com.tr </a>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svgBoyut2"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <path
                    d="M9.82829464,16.6565893 C7.02541569,15.7427556 5,13.1079084 5,10 C5,6.13400675 8.13400675,3 12,3 C15.8659932,3 19,6.13400675 19,10 C19,13.1079084 16.9745843,15.7427556 14.1717054,16.6565893 L12,21 L9.82829464,16.6565893 Z M12,12 C13.1045695,12 14,11.1045695 14,10 C14,8.8954305 13.1045695,8 12,8 C10.8954305,8 10,8.8954305 10,10 C10,11.1045695 10.8954305,12 12,12 Z"
                    fill="#0069ff"
                  ></path>
                </g>
              </svg>
            </li>
            <li>
              <a
                href="javascript:;"
                onclick="locationForm()"
                class="the me-btn btn-style-two alt btn-konum"
              >
                <svg
                  class="Pmm3mc svgBoyut"
                  style="fill: currentColor; margin-right: 15px"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"
                  ></path>
                </svg>
                Bu Konumu Benimle Paylaş</a
              >
            </li>
          </ul>

          <ul class="social-icon-two">
            <li>
              <a href="#" class="facebook-button"><span class="fab fa-facebook-f"></span></a>
            </li>
            <li>
              <a href="#" class="instagram-button"><span class="fab fa-instagram"></span></a>
            </li>
            <li>
              <a href="#" class="twitter-button"><span class="fab fa-twitter"></span></a>
            </li>
            <li>
              <a href="#" class="linkedin-button"><span class="fab fa-linkedin-in"></span></a>
            </li>
            <li>
              <a href="#" class="youtube-button"><span class="fab fa-youtube"></span></a>
            </li>
            <li>
              <a href="#" class="link-button"><span class="fas fa-globe"></span></a>
            </li>
          </ul>
        </div>
      </div>
</template>

<script setup>
const props = defineProps({
  info:Object
})
</script>

<style scoped>

</style>