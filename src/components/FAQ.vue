<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Frequently Asked Questions</h1>
            </div>
        </header>

        <table>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Required</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
        </table>

        <div class="cta">
            <a href="#start-now" class="button">Get your API key</a>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
