<template>
  <footer class="footer">
    <div class="footer__col">
      <h3 class="footer__title">Company details</h3>
      <ul class="footer__list">
        <li>
          <NuxtLink to="/">Contact us</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Twitter</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Terms of Service</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Privacy of Policy</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">GDPR</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">HIPAA - BAA</NuxtLink>
        </li>
      </ul><!-- / list -->
    </div><!-- / col -->
    <div class="footer__col">
      <h3 class="footer__title">Product</h3>
      <ul class="footer__list">
        <li>
          <NuxtLink to="/">Features</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Pricing</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Blog</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Documentation</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Playground</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Status page</NuxtLink>
        </li>
      </ul><!-- / list -->
    </div><!-- / col -->
    <div class="footer__col">
      <h3 class="footer__title">Guides</h3>
      <ul class="footer__list">
        <li>
          <NuxtLink to="/">Node.js Guide</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">PHP Guide</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Python Guide</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Ruby Guide</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">All our Guide</NuxtLink>
        </li>
      </ul><!-- / list -->
    </div><!-- / col -->
    <div class="footer__bottom">
      <NuxtLink to="/" class="footer__link">SASU PDFShift</NuxtLink>
      <span class="footer__text">128 rue la Boetie - 75008 Paris, France</span>
    </div><!-- / bottom -->
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  max-width: var(--width-main);
  margin: 0 auto;
  padding: 0 0 5rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 500;

  &__col {
    width: 24.2%;
  }

  &__title {
    font-family: var(--font-title);
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    margin: 0 0 1rem;
    color: #9695AD;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    color: #C9C8CB;

    li {
      margin-bottom: 0.9rem;

      a {
        color: inherit;

        &:hover {
          color: var(--color-secondary);
        }
      }
    }
  }

  &__bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 2.5rem 0 0;
    padding: 1rem 0 0;
    position: relative;
    z-index: 1;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: radial-gradient(ellipse at center,  rgba(184,171,255,1) 0%,rgba(184,171,255,0) 49%,rgba(184,171,255,0) 100%);

    }
  }
}
</style>