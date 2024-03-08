<template>
  <section class="hero">
    <h1 class="hero__title fade-slide">From HTML to pixel-perfect [PDF/Screenshot/Banner] in seconds</h1>
    <strong class="hero__sub-title fade-slide">Our always-up-to-date API for developers automates your document conversion tasks &dash; effortlessly.</strong>
    <Button
      class="fade-slide"
      hasArrow
      hasIcon
      glossy
      icon="images/icons/ico-key.svg"
    >
      Start converting for free
    </Button>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  max-width: 46rem;
  margin: 0 auto 4rem;
  text-align: center;

  &__title {
    font-family: var(--font-title);
    font-size: 3rem;
    line-height: 3.9rem;
    font-weight: 500;
    color: var(--color-primary);
    margin: 0 0 1rem;
    animation: fade-slide 1s ease-out 0.5s forwards;
  }

  &__sub-title {
    display: block;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    margin-bottom: 2rem;
    animation: fade-slide 1s ease-out 1s forwards;
  }

  .btn {
    animation: fade-slide 1s ease-out 1.5s forwards;
  }
}
</style>