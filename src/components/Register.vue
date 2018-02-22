<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Create your account now!</h1>
            </div>
        </header>

        <form method="post">
            <div class="input">
                <label for="start-now-name">Your name</label>
                <input type="text" name="name" placeholder="Your name" />
            </div>
            <div class="input">
                <label for="start-now-email">Your email</label>
                <input type="email" name="email" placeholder="Your email" />
            </div>
            <input type="submit" name="send" value="Get your API key" class="button" />
        </form>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
