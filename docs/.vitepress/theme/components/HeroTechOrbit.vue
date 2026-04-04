<template>
  <div class="hero-orbit" aria-hidden="true">
    <div class="hero-orbit__core">
      <div class="hero-orbit__pulse"></div>
      <div class="hero-orbit__toast-card">
        <div class="hero-orbit__toast-icon">!</div>
        <div class="hero-orbit__toast-copy">
          <strong>Toast Ready</strong>
          <span>Flash to frontend</span>
        </div>
      </div>
    </div>

    <div class="hero-orbit__item hero-orbit__item--laravel">
      <span class="hero-orbit__logo" aria-hidden="true">
        <svg viewBox="0 0 128 133" fill="none">
          <path
            d="M26.027344 0.136719C25.824219 0.214844 20.085938 3.484375 13.28125 7.394531C5.035156 12.136719 0.800781 14.632812 0.574219 14.867188C0.394531 15.070312 0.191406 15.421875 0.128906 15.644531C-0.0429688 16.21875 -0.0546875 100.347656 0.117188 100.953125C0.179688 101.1875 0.382812 101.53125 0.566406 101.722656C1.011719 102.191406 50.238281 130.496094 50.835938 130.632812C51.113281 130.699219 51.425781 130.6875 51.734375 130.601562C52.40625 130.433594 101.503906 102.191406 101.941406 101.730469C102.121094 101.53125 102.324219 101.1875 102.390625 100.953125C102.476562 100.675781 102.507812 96.277344 102.507812 87.015625L102.507812 73.480469L114.476562 66.605469C125.761719 60.117188 126.453125 59.710938 126.742188 59.265625L127.039062 58.785156L127.039062 44.207031C127.039062 28.335938 127.070312 29.230469 126.441406 28.65625C126.273438 28.507812 120.523438 25.152344 113.652344 21.195312L101.171875 14.015625L99.785156 14.015625L87.574219 21.027344C80.851562 24.894531 75.136719 28.199219 74.859375 28.378906C74.582031 28.5625 74.25 28.902344 74.113281 29.148438L73.867188 29.574219L73.8125 43.308594L73.761719 57.046875L63.679688 62.855469C58.132812 66.042969 53.515625 68.683594 53.417969 68.707031C53.238281 68.757812 53.226562 67.449219 53.226562 42.203125L53.226562 15.632812L52.960938 15.175781C52.628906 14.621094 54.121094 15.507812 39.136719 6.894531C26.570312 -0.332031 26.871094 -0.179688 26.027344 0.136719Z"
            fill="#f0523a"
          />
        </svg>
      </span>
      <span>Laravel</span>
    </div>

    <div class="hero-orbit__item hero-orbit__item--vue">
      <span class="hero-orbit__logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M2 4L16 28L30 4H24.5L16 18.5L7.5 4H2Z" fill="#41B883" />
          <path d="M7.5 4L16 18.5L24.5 4H19.5L16.0653 10.0126L12.5 4H7.5Z" fill="#35495E" />
        </svg>
      </span>
      <span>Vue</span>
    </div>

    <div class="hero-orbit__item hero-orbit__item--inertia">
      <span class="hero-orbit__logo" aria-hidden="true">
        <svg viewBox="0 0 128 128" fill="none">
          <path d="M92.433 28.433H55.625L91.192 64 55.625 99.567h36.808L128 64zm-55.625 0H0L35.567 64 0 99.567h36.808L72.375 64z" fill="#8163eb" />
        </svg>
      </span>
      <span>Inertia</span>
    </div>

    <div class="hero-orbit__item hero-orbit__item--react">
      <span class="hero-orbit__logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="8.2" ry="3.4" stroke="currentColor" stroke-width="1.6" />
          <ellipse cx="12" cy="12" rx="8.2" ry="3.4" stroke="currentColor" stroke-width="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8.2" ry="3.4" stroke="currentColor" stroke-width="1.6" transform="rotate(120 12 12)" />
        </svg>
      </span>
      <span>React</span>
    </div>

    <div class="hero-orbit__item hero-orbit__item--typescript">
      <span class="hero-orbit__logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="currentColor" />
          <path d="M8 9h8M11 9v7M14.2 11.6c.3-.6.9-.9 1.8-.9 1.1 0 1.8.5 1.8 1.3 0 .8-.5 1.1-1.6 1.4l-.7.2c-.9.2-1.2.5-1.2 1 0 .6.5 1 1.5 1 .8 0 1.4-.3 1.7-1" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span>TypeScript</span>
    </div>
  </div>
</template>

<style scoped>
.hero-orbit {
  position: relative;
  width: min(100%, 520px);
  min-height: 420px;
}

.hero-orbit__core {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
}

.hero-orbit__pulse {
  position: absolute;
  inset: 50% auto auto 50%;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  background:
    radial-gradient(circle, rgba(242, 78, 30, 0.16), rgba(242, 78, 30, 0.02) 58%, transparent 72%);
  transform: translate(-50%, -50%);
  animation: hero-pulse 6s ease-in-out infinite;
}

.hero-orbit__toast-card {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 22px;
  border: 1px solid rgba(242, 78, 30, 0.16);
  border-radius: 24px;
  min-width: 220px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 28px 60px rgba(16, 24, 40, 0.1);
  backdrop-filter: blur(14px);
  animation: hero-float 5s ease-in-out infinite;
}

.hero-orbit__toast-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f24e1e, #ff8b61);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.hero-orbit__toast-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hero-orbit__toast-copy strong {
  color: #1f2937;
  font-size: 1rem;
}

.hero-orbit__toast-copy span {
  color: #667085;
  font-size: 0.9rem;
}

.hero-orbit__item {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 18px 40px rgba(16, 24, 40, 0.08);
  backdrop-filter: blur(16px);
  color: #1f2937;
  font-size: 0.92rem;
  font-weight: 600;
}

.hero-orbit__logo {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  flex: 0 0 32px;
}

.hero-orbit__logo svg {
  width: 20px;
  height: 20px;
}

.hero-orbit__item--laravel {
  top: 18px;
  left: 30px;
  color: #ff2d20;
  animation: hero-bob 4.4s ease-in-out infinite;
}

.hero-orbit__item--vue {
  top: 42px;
  right: 12px;
  color: #42b883;
  animation: hero-bob 5s ease-in-out infinite 0.4s;
}

.hero-orbit__item--inertia {
  top: 182px;
  right: -8px;
  color: #9553e9;
  animation: hero-bob 4.8s ease-in-out infinite 0.8s;
}

.hero-orbit__item--react {
  bottom: 42px;
  left: 12px;
  color: #61dafb;
  animation: hero-bob 5.4s ease-in-out infinite 1.2s;
}

.hero-orbit__item--typescript {
  right: 54px;
  bottom: 18px;
  color: #3178c6;
  animation: hero-bob 4.6s ease-in-out infinite 1.6s;
}

@keyframes hero-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes hero-bob {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -12px, 0);
  }
}

@keyframes hero-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.9;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.08);
    opacity: 1;
  }
}

.dark .hero-orbit__toast-card,
.dark .hero-orbit__item {
  border-color: rgba(255, 255, 255, 0.08);
  background: rgba(16, 20, 27, 0.76);
  box-shadow: 0 26px 54px rgba(0, 0, 0, 0.28);
}

.dark .hero-orbit__toast-copy strong,
.dark .hero-orbit__item {
  color: #f8fafc;
}

.dark .hero-orbit__toast-copy span {
  color: #94a3b8;
}

@media (max-width: 959px) {
  .hero-orbit {
    min-height: 320px;
    margin: 28px auto 0;
  }

  .hero-orbit__pulse {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 639px) {
  .hero-orbit {
    min-height: auto;
    padding-top: 12px;
    display: grid;
    gap: 12px;
  }

  .hero-orbit__core,
  .hero-orbit__item {
    position: static;
    transform: none;
  }

  .hero-orbit__pulse {
    display: none;
  }

  .hero-orbit__toast-card {
    justify-content: center;
  }

  .hero-orbit__item {
    justify-self: center;
  }
}
</style>
