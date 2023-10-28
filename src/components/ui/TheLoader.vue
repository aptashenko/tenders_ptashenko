<template>
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</template>

<style lang="scss">
.lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 80%;
    height: 80%;
    margin: 8px;
    border: 4px solid $error-2;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $error-2 transparent transparent transparent;

  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
