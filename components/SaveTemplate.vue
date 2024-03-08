<template>
  <section class="template">
    <a href="#" class="template__btn">Save Template <span><img src="~/assets/images/icons/ico-command.svg" alt="command">S</span></a>
    <img class="template__img" src="~/assets/images/img-template-01.png" alt="template">
    <span class="template__circle">
      <img class="template__art" src="~/assets/images/img-template-02.png" alt="img">
    </span><!-- / circle -->
  </section><!-- / template -->
</template>

<style lang="scss" scoped>
.template {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 1;

  &__img {
    vertical-align: top;
    position: relative;
    z-index: 1;
  }

  &__btn {
    display: flex;
    position: absolute;
    z-index: 2;
    top: 10%;
    right: 2%;
    background: #332290;
    border: 1.58px solid rgba(255,255,255,0.05);
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    height: 2.5rem;
    font-weight: 500;
    color: var(--color-primary);
    transition: 0.3s;

    & > * {
      display: inline-flex;
      align-items: center;
      font-weight: 400;
      padding: 0 0.5rem;
      margin-left: 0.5rem;
      background: #4432A1;
      font-size: 0.8rem;
      line-height: 1.2rem;
      height: 1.5rem;
      border-radius: 0.375rem;
      border: 1px solid #513EB4;

      img {
        margin: -2px 0.2rem 0 0;
        vertical-align: top;
      }
    }

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__circle {
    position: absolute;
    z-index: 3;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 12.5rem;
    height: 12.5rem;
    background: linear-gradient(to bottom,  rgba(47,39,90,0.4) 0%,rgba(47,39,90,0) 100%);
    backdrop-filter: blur(5px);
    border: 1px dashed #4B3BA2;
    border-radius: 50%;
    overflow: hidden;
  }

  &__art {
    margin-top: 12%;
    opacity: 0.8;
  }
}
</style>