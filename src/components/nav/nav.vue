<template>
    <div class="nav-items">
        <router-link to="/" class="nav-item">Posts</router-link>
        <router-link to="map" class="nav-item">Map</router-link>
    </div>
</template>
<script>
export default {
    name: 'Nav'
}
</script>
<style lang="scss">
    .nav-items {
        display: flex;
        padding: 10px 0;
    }
    .nav-item {
        text-decoration: none;
        color: #000;
        padding: 5px;
        margin-right: 10px;
        &:hover {
            color: blue;
        }
    }
</style>