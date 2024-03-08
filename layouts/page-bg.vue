<template>
    <div class="bg-gradient-to-br from-white to-purple-400">
        <Header :fixed="true" />
        <main class="max-w-7xl mx-auto px-4 pt-24 pb-12 lg:pt-32">
            <slot />
        </main>
        <Footer />
    </div>
</template>
