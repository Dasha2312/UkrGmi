<template>
    <div class="main-wrapper">
        <Nav />
        
        <router-view></router-view>
    </div>
</template>
<script>
import Nav from '../components/nav/nav.vue'
export default {
    name: 'Main Wrapper',
    components: {
        Nav
    }
}
</script>
<style lang="scss">
    .main-wrapper {
        max-width: 1320px;
        margin: 0 auto;
    }
</style>