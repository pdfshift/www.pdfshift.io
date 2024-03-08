<template>
  <section class="features">
    <div class="features__holder">
      <h2 class="features__title">
        <img src="~/assets/images/logo-content.png" alt="logo">
        Powerful features for high-fidelity PDFs
      </h2><!-- / title -->
      <div class="features__cell">
        <IconBlock 
          iconUrl="images/icons/ico-feature-01.svg"
          iconAlt="icon"
        />
        <strong class="features__sub-title">
          <img src="~/assets/images/icons/ico-check.svg" alt="check">
          Render pages beautifully with full CSS support
        </strong>
        <div class="features__text">Our powerful engine supports all the latest CSS features, including custom web fonts, flexbox, grid layouts, and responsive design.</div>
      </div><!-- / cell -->
      <div class="features__cell">
        <IconBlock 
          iconUrl="images/icons/ico-feature-02.svg"
          iconAlt="icon"
        />
        <strong class="features__sub-title">
          <img src="~/assets/images/icons/ico-check.svg" alt="check">
          Tailor documents to suit your needs
        </strong>
        <div class="features__text">Customize headers and footers, inject custom CSS and Javascript, and wait for custom elements on the page so they turn out perfect every time.</div>
      </div><!-- / cell -->
      <div class="features__cell">
        <IconBlock 
          iconUrl="images/icons/ico-feature-03.svg"
          iconAlt="icon"
        />
        <strong class="features__sub-title">
          <img src="~/assets/images/icons/ico-check.svg" alt="check">
          Play nice with third-party libraries
        </strong>
        <div class="features__text">PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.</div>
      </div><!-- / cell -->
      <div class="features__cell">
        <IconBlock 
          iconUrl="images/icons/ico-feature-04.svg"
          iconAlt="icon"
        />
        <strong class="features__sub-title">
          <img src="~/assets/images/icons/ico-check.svg" alt="check">
          Generate documents in the blink of an eye
        </strong>
        <div class="features__text">Use PDFShift's powerful webhook system to quickly generate thousands of documents with minimal wait times. Need more? Invoke our parallel conversion system to convert many documents with a single request for results in milliseconds.</div>
      </div><!-- / cell -->
      <div class="features__cell">
        <IconBlock 
          iconUrl="images/icons/ico-feature-05.svg"
          iconAlt="icon"
        />
        <strong class="features__sub-title">
          <img src="~/assets/images/icons/ico-check.svg" alt="check">
          Conver documents securely
        </strong>
        <div class="features__text">Beam your raw HTML directly to PDFShift for completely secure conversions &dash; perfect for handling sensitive data.</div>
      </div><!-- / cell -->
    </div><!-- / holder -->
  </section><!-- / features -->
</template>

<style lang="scss" scoped>
.features {
  //full length background
  padding: 0 9999px;
  margin: 10rem -9999px 13.05rem;
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 10%;
    height: 31.25rem;
    width: 100%;
    background: url('~/assets/images/mask-03.png') repeat-x 10% 28%;
    //slow moving from left to right animation
    animation: move 500s linear infinite;

    @keyframes move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 100% 40%;
      }
    }
  }
  
  &__holder {
    width: var(--width-main);
    padding: 4.5rem 0 1rem;
    margin: 0 auto 5rem;
    border-radius: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 1px solid #3C2F85;
    background: rgba(3,0,20,0.5);
    backdrop-filter: blur(10px);

    .icon-block {
      margin: 0 0 1.95rem;
    }
  }

  &__title {
    font-family: var(--font-title);
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 0 0 4rem;
    text-align: center;
    font-size: 2.5rem;
    line-height: 3.25rem;
    font-weight: 500;
    color: #E0E0E0;

    * {
      margin-bottom: -1.75rem;
    }
  }

  &__cell {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 0 2rem 3.5rem;
    text-align: center;
  }

  &__sub-title {
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    color: var(--color-primary);
    margin-bottom: 1rem;

    & > * {
      margin-right: 0.5rem;
    }
  }
}
</style>