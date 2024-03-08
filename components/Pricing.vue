<template>
  <section class="pricing">
    <h2 class="pricing__title">Pricing</h2>
    <strong class="pricing__sub-title">Start for free with up to 50 credits per month and upgrade based on your needs</strong>
    <div class="pricing__toggle-holder">
      <label 
        :class="['pricing__label', !toggle ? 'pricing__label--active' : '']"
        for="lbl-pricing"
      >
        Monthly
      </label>
      <label @change="toggleActive" class="pricing__box">
        <input type="checkbox" name="lbl-pricing" id="lbl-pricing">
        <span class="pricing__toggle"></span>
      </label><!-- / box -->
      <label 
        :class="['pricing__label', toggle ? 'pricing__label--active' : '']"
        for="lbl-pricing"
      >
        Yearly
      </label>
    </div><!-- / toggle -->
    <div class="pricing__frame">
      <div class="pricing__info">
        <div v-if="sliderValue <= 9">
          <strong class="pricing__plan">{{ currentPlan.name }}</strong>
          <strong class="pricing__price">
            ${{ toggle ? currentPlan.price * 10 : currentPlan.price }} <span>&nbsp;/{{ toggle ? 'year' : 'month' }}</span>
          </strong><!-- / price -->
          <ul class="pricing__points">
            <li>Total Overage: <strong>{{ currentPlan.overage }}</strong></li>
            <li>Credits: <strong>{{ currentPlan.credits }}</strong></li>
          </ul><!-- / points -->
          <Button hasArrow fullWidth>Get started for free</Button>
        </div>
        <div v-else>
          <strong class="pricing__message">{{ currentPlan.priceMessage }}</strong>
          <Button hasArrow fullWidth>Contact Us</Button>
        </div>
      </div><!-- / info -->
      <ul class="pricing__list">
        <li>No file size limit</li>
        <li>CSS & Javascript injection </li>
        <li>AWS S3 delivery</li>
        <li>Parallel & Asynchronous responses</li>
        <li>Advanced header & footer</li>
        <li>Encryption and Watermark</li>
      </ul><!-- /list -->
    </div><!-- / frame -->
    <div class="pricing__slider-holder">
      <span 
        class="pricing__value-box"
        :style="{ left: positionLeft + 'px' }"
      >
        <span v-if="sliderValue <= 9">{{ currentPlan.credits }}</span>
        <span v-else>1M+</span>
      </span>
      <div class="pricing__range-holder">
        <div class="pricing__dots-holder">
          <span 
            v-for="(plan, index) in plans" 
            :key="index" 
            class="pricing__range-item"
            :style="{ left: ((index * 10)) + '%' }"
          ></span>
        </div>
        <input 
          ref="slider"
          v-model="sliderValue"
          @input="updateBoxPosition"
          class="pricing__range"
          type="range" 
          min="0" 
          max="10" 
          step="1"
        >
      </div>
    </div>
    <div class="pricing__input-holder">
      <label class="pricing__lbl">I'll need to convert</label>
      <input 
        class="pricing__input"
        type="text"
        v-model="typedValue"
        @input="matchValueToPlan"
        placeholder="Enter manual credit"
      >
      <label class="pricing__lbl">documents per month</label>
    </div>
  </section><!-- / pricing -->
</template>

<script setup>
import { ref, computed } from 'vue';

const typedValue = ref('');
const sliderValue = ref(0);
const positionLeft = ref(0);
const slider = ref(null);

const currentPlan = computed(() => {
  return plans[sliderValue.value] || {
    name: 'Invalid',
    price: 'Invalid',
  }
});

const updateBoxPosition = () => {
    const sliderWidth = slider.value.offsetWidth;
    const thumbWidth = 20 //value should be in px

    const max = parseInt(slider.value.max, 10);
    const value = sliderValue.value;

    let position = ((sliderWidth / max) * value) - ((value / 10) * thumbWidth);

    positionLeft.value = position;
};

const matchValueToPlan = () => {
  const typedNum = parseFloat(typedValue.value);
  if (isNaN(typedNum)) return;

  for (let i = 0; i < plans.length; i++) {
    if (typedNum <= plans[i].credits) {
      sliderValue.value = i;
      updateBoxPosition();
      break;
    }

    if (typedNum > 1000000) {
      sliderValue.value = plans.length - 1;
      updateBoxPosition();
    }
  }
}

//toggle active on labels after click on checkbox
const toggle = ref(false);
const toggleActive = () => {
  toggle.value = !toggle.value;
}

const plans = [
  {
    name: 'Free',
    price: 0,
    credits: 50,
    overage: 'N/A',
  },
  {
    name: 'Starter',
    price: 9,
    credits: 500,
    overage: '0.04',
  },
  {
    name: 'Boost',
    price: 24,
    credits: 2500,
    overage: '0.03',
  },
  {
    name: 'Growth',
    price: 39,
    credits: 5000,
    overage: '0.025',
  },
  {
    name: 'Business',
    price: 99,
    credits: 25000,
    overage: '0.02',
  },
  {
    name: 'Shift 50k',
    price: 149,
    credits: 50000,
    overage: '0.01',
  },
  {
    name: 'Shift 100k',
    price: 249,
    credits: 100000,
    overage: '0.005',
  },
  {
    name: 'Shift 250k',
    price: 499,
    credits: 250000,
    overage: '0.003',
  },
  {
    name: 'Shift 500k',
    price: 799,
    credits: 500000,
    overage: '0.002',
  },
  {
    name: 'Shift 1M',
    price: 999,
    credits: 1000000,
    overage: '0.0005',
  },
  {
    name: '1M+',
    credits: 1000001,
    priceMessage: "We easily support more than 1 Million conversions per month. Please reach out to us with your needs and we'll find the perfect pricing for you."
  },
];


</script>

<style lang="scss" scoped>
.pricing {
  max-width: 42.5rem;
  margin: 0 auto 4.3125rem;

  &__title {
    font-family: var(--font-title);
    font-size: 2.5rem;
    line-height: 2.75rem;
    font-weight: 500;
    text-align: center;
    color: var(--color-primary);
    margin: 0 0 0.75rem;
  }

  &__sub-title {
    display: block;
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 500;
    color: var(--color-secondary);
    text-align: center;
    margin-bottom: 2.5rem;
  }

  &__toggle-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 2rem;
  }

  &__box {
    display: flex;
    width: 2.5rem;
    height: 1.5rem;
    position: relative;
    z-index: 1;
    border-radius: 1.5rem;
    padding: 0.1875rem;
    border: 1px solid #27204B;
    margin: 0 0.75rem;
    cursor: pointer;

    & > input {
      opacity: 0;
      position: absolute;
      left: -9999px;
    }
  }

  &__label {
    display: block;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    color: #9F9BB8;

    &--active {
      color: var(--color-primary);
    }
  }

  &__toggle {
    display: block;
    position: relative;
    width: 1rem;
    height: 1rem;
    background: #5A48BF;
    border-radius: 50%;
    left: 0;
    transition: 0.3s;
  }

  input:checked + .pricing__toggle {
    left: 1rem;
  }

  &__frame {
    display: flex;
    justify-content: flex-start;
    max-width: 38rem;
    margin: 0 auto;
  }

  &__info {
    width: 45%;
    background: rgba(10,6,33,0.8);
    border: 1px solid var(--stroke-btn-primary);
    border-radius: 0.75rem;
    padding: 2rem 1.75rem;
  }

  &__plan {
    display: block;
    font-size: 1.25rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #D3CBFF;
    margin-bottom: 2rem;
  }

  &__price {
    display: inline-flex;
    font-size: 2.5rem;
    line-height: 2.5rem;
    font-weight: 600;
    margin: 0 0 1.75rem;
    color: var(--color-primary);

    & > * {
      color: #9F9BB8;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 400;
      margin: auto 0 0.25rem 2px;
    }
  }

  &__points {
    margin: 0 0 1rem;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      z-index: 1;
      padding: 0 0 0.35rem 0.75rem;
      color: #9F9BB8;

      &:before {
        content:'';
        position: absolute;
        z-index: 1;
        top: 8px;
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #9F9BB8;
      }

      strong {
        color: #E0DCF4;
      }
    }
  }

  &__list {
    width: 56%;
    padding: 2.75rem 0 0 10% ;
    margin: 0 -1% 0 0;
    list-style: none;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;

    li {
      padding: 0 0 1.35rem 1.9rem;
      position: relative;
      z-index: 1;

      &:before {
        content: '';
        position: absolute;
        left: -3px;
        top: -2px;
        z-index: 1;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: #32286A url('~/assets/images/icons/ico-check-big.svg') no-repeat 50% 50%;
      }
    }
  }

  &__slider-holder {
    position: relative;
    z-index: 1;
    padding-top: 2rem;
    margin-top: 3.5rem;
  }

  &__value-box {
    position: absolute;
    top: -11px;
    left: 0;
    z-index: 2;
    background: #2C2454;
    border: 1px solid #443A7A;
    width: 58px; //px value is required
    height: 1.75rem;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.75rem;
    font-weight: 600;
    border-radius: 1rem;
    transform: translateX(-20px);
    box-shadow: inset
      0 2px 10px rgba(169,155,249,0.25),
      0 0 11px rgba(169,155,249,0.2);
  }

  &__dots-holder {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: 1rem;
    margin: 0 11px;
    pointer-events: none;
  }

  &__range-item {
    position: absolute;
    background: #27243A;
    box-shadow: 0 2px 4px rgba(79,57,203,0.5);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    top: 50%;
    transform: translate(-3px, -4px);
    pointer-events: none;

    &:first-of-type,
    &:last-of-type {
      display: none;
    }
  }

  &__range-holder {
    position: relative;
    z-index: 1;
    height: 1rem;
    margin: 0 0 1.5rem;
    border-radius: 1rem;
    background: #1C1640;
    border: 1px solid #1C1640;
    box-shadow: 
     inset 0 -1px 2px rgba(99,91,144,1),
     inset 0 8px 24px rgba(6,3,27,1),
     inset 0 4px 4px rgba(6,3,27,1);
  }

  &__range {
    display: block;
    -webkit-appearance: none;
    background: none;
    width: 100%;
    height: 1rem;
    margin: -1px;
    outline: none;
    position: relative;
    z-index: 2;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: url('~/assets/images/icons/ico-range.svg') no-repeat 50% 50%;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #5A48BF;
      cursor: pointer;
    }
  }

  &__input-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.75rem;
  }

  &__lbl {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
  }

  &__input {
    padding: 1rem;
    margin: 0 1rem;
    width: 14rem;
    height: 2.5rem;
    background: #0F0B28;
    border: 1px solid #4634BB;
    color: #8881AE;
    box-shadow: 0 0 0 4px rgba(70,52,187,0.2);
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 400;
  }

  &__message {
    display: block;
    font-size: 1.3rem;
    line-height: 1.5rem;
    margin-bottom: 1.3rem;
    color: var(--color-primary);
    font-weight: 500;
    text-align: center;
  }
}
</style>