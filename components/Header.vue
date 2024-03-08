<template>
  <header class="header">
    <div class="header__frame">
      <Logo class="fade-slide"/>
      <nav class="header__nav fade-slide">
        <div class="header__holder">
          <NuxtLink class="header__link" to="/">Features</NuxtLink>
          <NuxtLink class="header__link" to="/">Pricing</NuxtLink>
          <NuxtLink class="header__link" to="/" target="_blank">
            Docs
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
          </NuxtLink>
          <NuxtLink class="header__link" to="/" target="_blank">
            Status page
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
          </NuxtLink>
        </div><!-- / holder -->
      </nav><!-- / nav -->
      <div class="header__sign-in">
        <NuxtLink to="/">Login</NuxtLink>
        <Button
          to="/"
          hasIcon
          glossy
          icon="images/icons/ico-key.svg"
        >
          Register
        </Button>
      </div><!-- / sign-in -->
    </div>
  </header>
</template>

<script setup>
import Logo from '~/components/Logo.vue';
import Button from '~/components/Button.vue';

</script>

<style lang="scss" scoped>
.header {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  backdrop-filter: blur(5px);

  &__frame {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    max-width: var(--width-main);
  }

  //glow effect at the top of the page
  &:before {
    content: '';
    width: 37.5rem;
    height: 37.5rem;
    position: absolute;
    top: -37.5rem;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    border-radius: 50%;
    box-shadow:  
      0 0 106px 264px rgba(109, 96, 195, 0.02),
      0 0 89px 149px rgba(109, 96, 195, 0.06),
      0 0 66px 66px rgba(109, 96, 195, 0.1),
      0 0 36px 17px rgba(109, 96, 195, 0.12),
      0 0 0 0 rgba(109, 96, 195, 0.12);
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  
  //main navigation
  &__nav {
    position: relative;
    z-index: 1;
    animation: fade-slide 1s ease-out 2.5s forwards;

    //nav lines
    &:before,
    &:after {
      content: '';
      width: 25rem;
      height: 1px;
      position: absolute;
      top: 50%;
      z-index: -1;
      background: radial-gradient(ellipse at center,  rgba(77,66,141,0.5) 0%,rgba(55,45,104,0) 100%);
      
    }

    &:before {
      left: -50%;
    }

    &:after {
      right: -50%;
    }
  }

  &__holder {
    border-radius: 2.5rem;
    border: 1px solid #362D68;
    padding: 0.5rem;
    background: rgba(7,3,28,0.6);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    margin: 0 1.5rem;
    transition: 0.3s;

    &:hover {
      text-decoration: none;
      color: (var(--color-primary));

      svg {
        stroke: var(--color-primary);
      }
    }

    & > svg {
      width: 0.75rem;
      margin-left: 0.5rem;
      transition: 0.3s;
      stroke: var(--color-secondary);
    }
  }

  & .logo {
    opacity: 0;
    animation: slide-from-left 1s ease-out 1.5s forwards;
  }

  //sign in button
  &__sign-in {
    display: flex;
    align-items: center;
    margin-left: 2rem;
    opacity: 0;
    animation: slide-from-right 1s ease-out 1.5s forwards;

    .btn {
      margin-left: 1.5rem;
    }
  }
}
</style>