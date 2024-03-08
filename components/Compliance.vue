<template>
  <section class="compliance">
    <div class="compliance__holder">
      <h2 class="compliance__title">Guaranteed privacy with HIPAA compliance</h2>
      <p class="compliance__text">PDFShift's conversion technology is fully HIPAA compliant, making it a great choice for the healthcare industry. We don't store your documents (unless specifically requested in the API), so we can ensure the privacy of your data.</p>
      <Button hasArrow>Review our Business Associate Agreement (BAA)</Button>
    </div><!-- / holder  -->
    <img class="compliance__img" src="~/assets/images/img-shield.png" alt="shield">
  </section>
</template>

<style lang="scss" scoped>
.compliance {
  display: flex;
  max-width: 72.8125rem;
  margin: 0 auto 8rem;

  &__holder {
    width: 47%;
    position: relative;
    z-index: 2;
  }

  &__img {
    margin: -4% -7% 0;
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: 2.5rem;
    line-height: 2.5rem;
    font-family: var(--font-title);
    font-weight: 500;
    color: var(--color-primary);
    margin: 0 0 2.5rem;
  }

  &__text {
    font-size: 1.25rem;
    line-height: 1.875rem;
    font-weight: 500;
    margin: 0 0 1.5rem;
  }

  .btn {
    margin-top: 0.5rem;
  }
}
</style>