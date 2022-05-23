<template>
    <span class="input-switch-container">
        <p class="input-switch-label">
            <strong>{{ label }}</strong>
        </p>
        <label class="input-switch-outer">
            <input :checked="startChecked" autocomplete="off" type="checkbox" />
            <span class="input-switch"></span>
        </label>
    </span>
</template>

<script>
export default {
    name: "GenericSwitch",
    props: {
        label: String,
        startChecked: String,
    },
};
</script>
