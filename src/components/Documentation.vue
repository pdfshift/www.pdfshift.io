<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Documentation
                    <small>PDFShift DEV center</small>
                </h1>
            </div>
        </header>

        <div class="container">
            <div class="secton" v-for="section in sections" :key="section.key">
                <h3 :id="'section-' + section.key">{{ section.name }}</h3>
                <table>
                    <tr v-for="parameter in section.parameters" :key="parameter.name">
                        <td class="docs-parameter-name">
                            {{ parameter.name }}
                            <span class="required" v-if="parameter.required">*</span>
                            <small>{{ parameter.type }}</small>
                        </td>
                        <td class="docs-parameter-info">
                            <p>{{ parameter.description }}</p>
                            <small v-if="parameter.example"><em>Example:</em> {{ parameter.example }}</small>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="cta">
            <a href="#start-now" class="button">Get your API key</a>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent},
    data () {
        return {
            sections: [
                {
                    name: 'General',
                    key: 'general',
                    parameters: [
                        {
                            name: 'url',
                            required: true,
                            type: 'URL',
                            description: 'Source URL to load and convert in PDF',
                            example: 'https://www.google.com'
                        }
                    ]
                }
            ]
        }
    }
}
</script>
