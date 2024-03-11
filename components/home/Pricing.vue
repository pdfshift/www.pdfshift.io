<template>
    <section class="py-16 lg:py-16 max-w-5xl mx-auto" id="pricing">
        <div class="flex flex-col items-center gap-4 mb-4 md:mb-0">
            <div class="text-purple-100 bg-purple rounded-full p-2.5">
                <IconsDollarCircle />
            </div>
            <h2 class="h2 text-navy-700 text-center">Pricing</h2>
            <p class="p text-navy-700 max-w-md text-center">
                Start for free with up to 50 credits per month<br />
                Upgrade based on your needs
            </p>
            <div class="mt-8">
                <input type="checkbox" class="hidden" value="1" v-model="isYearly" />
                <div class="flex items-center gap-4 font-light">
                    <button type="button" :class="{'text-purple hover:text-purple': !isYearly, 'hover:text-navy-700': isYearly}" @click="isYearly = false">
                        Monthly
                    </button>
                    <div class="cursor-pointer w-12 h-6 bg-white border border-purple rounded-full relative" @click="isYearly = !isYearly">
                        <div class="bg-purple size-4 absolute rounded-full top-[3px] transition-all duration-100 left-1" :class="{'translate-x-[1.33rem]': isYearly,'translate-x-0': !isYearly}"></div>
                    </div>
                    <button type="button" :class="{'text-purple hover:text-purple': isYearly, 'hover:text-navy-700': !isYearly}" @click="isYearly = true">
                        Yearly
                    </button>
                </div>
            </div>
        </div>
        <div class="flex items-center flex-col">
            <div class="border border-purple bg-white rounded-lg mt-4 px-4 py-8 flex flex-col justify-center items-center gap-8 w-full">
                <h3 class="h3">Select your monthly conversion needs</h3>
                <div class="mt-8 w-full">
                    <div class="relative bg-purple-100 h-4 rounded-md" @click="updateThumbPosition" ref="sliderTrack">
                        <div class="absolute left-0 top-0 h-4 bg-purple rounded-md" :style="{ width: thumbPosition + '%' }">
                            <div class="size-6 block absolute -right-3 -top-1 bg-purple rounded-full cursor-pointer">
                                <span class="absolute bottom-8 bg-purple rounded-full text-white font-medium text-sm px-2 py-1">{{ displayValue }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center flex items-center space-x-4 flex-col md:flex-row">
                    <label class="p -small mb-2 md:mb-0" for="input-number-credits">I'll need to convert</label>
                    <input id="input-number-credits" class="input" type="number" min="1" v-model="inputValue" @input="onInputValueChange" />
                    <span class="p -small mt-2 md:mt-0">documents* per month</span>
                </div>
            </div>
            <div class="border border-purple bg-white rounded-lg p-4 pb-8 mt-8 flex flex-col md:flex-row items-center gap-12 w-full">
                <div class="border border-purple rounded-md overflow-hidden">
                    <div class="text-lg lg:text-xl text-white bg-purple py-2 text-center px-4">You selected the<br />{{ currentPlan.name }} plan</div>
                    <div class="p-6 space-y-6 max-w-80 w-80" v-if="inputValue < 1000000">
                        <div>
                            <span class="font-light"> <strong class="text-purple font-bold">{{ currentPlan.credits }}</strong> Credits</span>
                        </div>
                        <div>
                            <template v-if="currentPlan.name === 'Free'">
                                <span class="h2">Free</span>
                            </template>
                            <template v-else>
                                <span class="h2">${{ isYearly ? currentPlan.price * 10 : currentPlan.price }}</span>
                                <span class="font-light">&nbsp;/{{ isYearly ? 'year' : 'month' }}</span>
                            </template>
                        </div>
                        <ol class="font-light list-disc marker:text-purple list-inside">
                            <li>Total Overage: <strong class="text-purple font-bold">{{ currentPlan.overage }}</strong>/credits</li>
                            <li>Max file size: <strong class="text-purple font-bold">{{ currentPlan.name === 'Free' ? '2Mb' : 'Unlimited' }}</strong></li>
                            <li>Timeout: <strong class="text-purple font-bold">{{ currentPlan.name === 'Free' ? '30s' : 'Up to 15 minutes' }}</strong></li>
                        </ol>
                        <Button to="/register" color-class="w-64 border border-purple text-purple bg-white hover:bg-purple hover:text-white hover:border-purple">Get Started</Button>
                    </div>
                    <div class="p-6 space-y-6 max-w-80 w-80" v-else>
                        <div>
                            <p class="my-10">We easily support more than 1 Million conversions per month. Please reach out to us with your needs and we'll find the perfect pricing for you.</p>
                            <Button to="/contact" color-class="w-64 border border-purple text-purple bg-white hover:bg-purple hover:text-white hover:border-purple">Contact us to get a custom quote</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="h3">{{ currentPlan.name === 'Free' ? 'Basic features' : 'All features included' }}:</div>
                    <div class="mt-4 md:mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <ol class="space-y-4 lg:border-purple lg:border-r pr-8">
                            <li class="flex items-center gap-2 font-light">
                                <span class="text-purple w-6"><IconsTickFull /></span>
                                <span>CSS & Javascript injection</span>
                            </li>
                            <li class="flex items-center gap-2 font-light">
                                <span class="text-purple w-6"><IconsTickFull /></span>
                                <span>Advanced header & footer</span>
                            </li>
                            <li class="flex items-center gap-2 font-light">
                                <span class="text-purple w-6"><IconsTickFull /></span>
                                <span>Encryption and Watermark</span>
                            </li>
                        </ol>
                        <ol class="space-y-4">
                            <li class="flex items-center gap-2 font-light">
                                <span class="text-purple w-6">
                                    <IconsCross v-if="currentPlan.name === 'Free'" />
                                    <IconsTickFull v-else />
                                </span>
                                <span :class="{'line-through': currentPlan.name === 'Free'}">No file size limit</span>
                            </li>
                            <li class="flex items-center gap-2 font-light">
                                <span class="text-purple w-6">
                                    <IconsCross v-if="currentPlan.name === 'Free'" />
                                    <IconsTickFull v-else />
                                </span>
                                <span :class="{'line-through': currentPlan.name === 'Free'}">AWS S3 delivery</span>
                            </li>
                            <li class="flex items-center gap-2 font-light">
                                <span class="text-purple w-6">
                                    <IconsCross v-if="currentPlan.name === 'Free'" />
                                    <IconsTickFull v-else />
                                </span>
                                <span :class="{'line-through': currentPlan.name === 'Free'}">Parallel & Asynchronous responses</span>
                            </li>
                        </ol>
                    </div>
                    <div>
                        <p class="mt-24 font-light">
                            * We count 1 credit per 5Mb. For example, a 14Mb file will consume 3 credits.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

//plans settings
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
        overage: '0.04'
    },
    {
        name: 'Boost',
        price: 24,
        credits: 2500,
        overage: '0.03'
    },
    {
        name: 'Growth',
        price: 39,
        credits: 5000,
        overage: '0.025'
    },
    {
        name: 'Business',
        price: 99,
        credits: 25000,
        overage: '0.02'
    },
    {
        name: 'Shift 50k',
        price: 149,
        credits: 50000,
        overage: '0.01'
    },
    {
        name: 'Shift 100k',
        price: 249,
        credits: 100000,
        overage: '0.005'
    },
    {
        name: 'Shift 250k',
        price: 499,
        credits: 250000,
        overage: '0.003'
    },
    {
        name: 'Shift 500k',
        price: 799,
        credits: 500000,
        overage: '0.002'
    },
    {
        name: 'Shift 1M',
        price: 999,
        credits: 1000000,
        overage: '0.0005'
    },
    {
        name: '1M+',
        credits: 1000001,
        priceMessage: "We easily support more than 1 Million conversions per month. Please reach out to us with your needs and we'll find the perfect pricing for you.",
    },
];

// custom slider start
const sliderTrack = ref(null);
const thumbPosition = ref(0); // Position in percentage
const isDragging = ref(false);
const selectedPlan = ref(null);
const totalRange = 1000000; // max value of slider
const sectionWidth = plans.length - 1; // removing last plan that we need to show 1m+ message
const inputValue = ref(50);
const isYearly = ref(false);

const planRanges = computed(() => {
    return plans.map(plan => {
        let range = plan.credits / totalRange * 1000000; // Percentage of total range
        return range;
    });
});

const startDrag = () => {
    isDragging.value = true;
};

const stopDrag = ($event) => {
    updateThumbPosition($event);
    isDragging.value = false;
};

const updateThumbPosition = ($event) => {
    if ($event.type !== 'click' && !isDragging.value) return; // Only update if dragging or clicking
    if ($event.type === 'touchend') return // No clientX on end, but we had the value from previous

    const bounds = sliderTrack.value.getBoundingClientRect();
    let clientX = null;

    if ($event.type === 'touchmove') {
        clientX = $event.touches[0].clientX
    } else {
        $event.preventDefault();
        clientX = $event.clientX
    }

    let position = (clientX - bounds.left) / bounds.width * 100;

    // Boundary checks
    position = Math.max(position, 0); // Prevent going beyond left boundary
    position = Math.min(position, 99); // Prevent going beyond right boundary

    if (position < 99) {
        // Determine which plan range the position falls into
        let accumulatedRange = 0;
        for (let i = 0; i < planRanges.value.length; i++) {
            accumulatedRange += planRanges.value[i];
            if ((position * 10000) <= accumulatedRange) {
                selectedPlan.value = plans[i];
                break;
            }
        }
    } else {
        selectedPlan.value = plans[plans.length - 1]; // Default to last plan if at 100%
    }

    thumbPosition.value = position;
};

// Function to calculate the exact numeric value based on the slider's position
const computeNumericValue = () => {
    if (thumbPosition.value < 99) {
        for (let i = 0; i < plans.length; i++) {
            let sectionStart = sectionWidth * i;
            let sectionEnd = sectionStart + sectionWidth;

            if (thumbPosition.value >= sectionStart && thumbPosition.value < sectionEnd) {
                // Determine the value within the current section
                let sectionPosition = (thumbPosition.value - sectionStart) / sectionWidth;
                let rangeStart = i === 0 ? 0 : plans[i - 1].credits;
                let rangeEnd = plans[i].credits;
                return Math.max(Math.round(rangeStart + sectionPosition * (rangeEnd - rangeStart)), 1);
            }
        }
    }

    return totalRange; // Return the max value if at 100%
};

const displayValue = computed(() => {
    return computeNumericValue();
});

onMounted(() => {
    sliderTrack.value.addEventListener('touchstart', startDrag, {passive: true});
    sliderTrack.value.addEventListener('mousedown', startDrag)

    document.addEventListener('touchend', stopDrag);
    document.addEventListener('touchcancel', stopDrag, false);
    document.addEventListener('touchleave', stopDrag, false);
    document.addEventListener("touchmove", updateThumbPosition);

    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('mousemove', updateThumbPosition);
});

onBeforeUnmount(() => {
    if (sliderTrack && sliderTrack.value) {
        sliderTrack.value.removeEventListener('touchstart', startDrag);
        sliderTrack.value.removeEventListener('mousedown', startDrag)
    }

    document.removeEventListener('touchend', stopDrag);
    document.removeEventListener('touchcancel', stopDrag);
    document.removeEventListener('touchleave', stopDrag);
    document.removeEventListener("touchmove", updateThumbPosition);

    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('mousemove', updateThumbPosition);
});

//customslider end
const currentPlan = computed(() => {
    let value = computeNumericValue();
    for (let plan of plans) {
        if (value <= plan.credits) {
            return plan;
        }
    }
    return plans[plans.length - 1]; // Default to the last plan if value exceeds all ranges
});

// Find the slider position for a given value
const findPositionForValue = (value) => {
    for (let i = 0; i < plans.length; i++) {
        let rangeStart = i === 0 ? 0 : plans[i - 1].credits;
        let rangeEnd = plans[i].credits;
        if (value >= rangeStart && value <= rangeEnd) {
            let sectionStart = sectionWidth * i;
            return sectionStart + ((value - rangeStart) / (rangeEnd - rangeStart)) * sectionWidth;
        }
    }
    return 100; // Default to end if value exceeds max range
};

// When inputValue changes, update the slider's position
const onInputValueChange = () => {
    let value = Math.min(Math.max(inputValue.value, 0), totalRange); // Clamping the value
    let newPosition = findPositionForValue(value);
    thumbPosition.value = newPosition;
};
onInputValueChange()

// Watch the thumbPosition to update inputValue
watch(() => thumbPosition.value, (newPosition) => {
    inputValue.value = computeNumericValue();
});
</script>
