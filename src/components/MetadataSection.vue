<template>
    <ul>
        <li v-for="(metadataObject, index) in metadataArray" :key="index">
            <span>{{ metadataObject.title }}</span
            >{{ metadataObject.content }}
        </li>
    </ul>
</template>

<script>
export default {
    name: "MetadataSection",
    props: {
        metadataArray: {
            type: Object,
            default: [],
        },
    },
};
</script>

<style lang="scss" scoped>
ul {
    width: auto;
    max-width: 500px;
    list-style: none;
    margin: 15px auto;
    padding: 0px;
}
li {
    width: 100%;
    font-size: 18px;
}
span {
    color: var(--main-brand-colour-800);
    font-weight: bold;
    margin-right: 5px;
    padding-right: 5px;
    border-right: 2px solid var(--main-brand-colour-600);
}
</style>
