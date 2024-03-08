<template>
  <section class="conversion">
    <div class="conversion__holder">
      <h2 class="conversion__title">Enabling automated conversion for 5 years and counting &dash; and we're here to stay!</h2>
      <Button
        to="/"
        hasIcon
        glossy
        hasArrow
        icon="images/icons/ico-key.svg"
      >
        Register for free
      </Button>
    </div><!-- / holder -->
    <img class="conversion__img" src="~/assets/images/logo-footer.png" alt="logo">
  </section><!-- / conversion -->
</template>

<style lang="scss" scoped>
.conversion {
  max-width: var(--width-main);
  display: flex;
  align-items: flex-start;
  margin: -0.625rem auto 0;
  padding: 12rem 0 8.3rem;

  &__holder {
    margin-right: -15%;
    position: relative;
    z-index: 2;
  }

  &__title {
    font-family: var(--font-title);
    font-size: 2.5rem;
    line-height: 3rem;
    font-weight: 500;
    color: var(--color-primary);
    margin: 0 0 1rem;
  }

  &__sub-title {
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 500;
    display: block;
    margin: 0 0 2.5rem;
  }

  &__img {
    position: relative;
    margin: -14.8% -10% 0 22.8%; //TODO: think of better solution
    z-index: -2;
  }
}
</style>