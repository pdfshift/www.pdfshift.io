<template>
    <div>
        <div class="plans">
            <div v-for="(plan, name) in plans" v-bind:key="name" class="name" :class="{'selected': isPlan(name)}" v-on:click="setPlan(name)">
                <h4>{{ plan.display }} plan</h4>
                <span class="details">{{ plan.conversions }} conversions / month</span>
                <span class="details">{{ plan.document }}Mb per documents</span>
                <span class="price" v-if="plan.price">${{ plan.price}}/Mo</span>
                <span class="price" v-else>Free</span>
                <div class="action">
                    <template v-if="isPlan(name)">
                        <a href="javascript:;" class="button disabled">It's your plan!</a>
                    </template>
                    <template v-else-if="isPlanBetterThan(name)">
                        <a href="javascript:;" class="button">
                            Downgrade to {{ plan.display }}
                            <template v-if="plan.price">(${{ plan.price }}/Mo)</template>
                        </a>
                    </template>
                    <template v-else>
                        <a href="javascript:;" class="button">Upgrade to {{ plan.display }} (${{ plan.price }}/Mo)</a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        account: Object,
        plans: Object
    },
    created () {
        this.$parent.header = 'Upgrade your account'
        this.$parent.subheader = 'Select the plan that fits your needs'
    },
    methods: {
        getPlanName () {
            return (this.account.plan === null) ? 'free' : this.account.plan.name
        },
        isPlan (name) {
            return this.getPlanName() === name
        },
        isPlanBetterThan (name) {
            return this.plans[name].position <= this.plans[this.getPlanName()].position
        },
        setPlan (name) {
            if (name !== this.getPlanName()) {
                this.$router.push({name: 'upgrade-stripe', params: {plan: name}})
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/colors.less';

.plans {
    margin-top: 40px;
}

.plans>div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 30px;
    background-color: fadeOut(@secondary_color, 90);
    padding: 10px 10px;
    border-radius: 4px;
    box-shadow: 10px 10px 10px #ccc;
    transition: background-color 0.25s ease-in-out;

    &.selected {
        background-color: fadeOut(yellow, 75);
    }

    &:not(.selected):hover {
        background-color: fadeOut(@secondary_color, 80);
        cursor: pointer;
    }

    &>h4 {
        display: block;
        margin: 0 0 0 10px;
        text-align: left;
        align-self: center;
        width: 10%;
        color: @primary_color;
    }

    &>span {
        display: block;
        align-self: center;
        text-align: left;
        margin: 0;
        color: #444;
    }

    &>.action {
        display: block;
        text-align: right;
        align-self: center;
        min-width: 325px;

        >.disabled {
            opacity: 0.5;
            cursor: default;
        }

        >span {
            padding: 15px 10px 15px 40px;
            display: inline-block;
            color: @secondary_color;
        }
    }
}

</style>
