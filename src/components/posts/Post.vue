<template>
    <div class="post-item">
        <div>Title: {{post_item.title}}</div>
        <div>Text: {{post_item.body}}</div>
        <div>Number of comments: {{ comments }}</div>
    </div>
</template>
<script>

export default {
    name: 'Post',
    props: {
        post_item: {
            type: Object,
            default() {
                return{}
            }
        },
        comments: {
            type: Number
        }
    },

}
</script>
<style lang="scss" scoped>
    .post-item {
        padding: 15px;
        border: 1px solid black;
        border-radius: 4px;
        margin-bottom: 15px;
    }
</style>