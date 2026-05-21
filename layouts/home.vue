<template>
    <div>
        <div id="main-content">
            <slot />
        </div>
        <Footer :push="true" />
    </div>
</template>
