<template>
    <div class="general-section overrideCollapse">
        <h1>Colours</h1>
        <div class="colours">
            <span class="colour c1"></span>
            <span class="colour c2"></span>
            <span class="colour c3"></span>
            <span class="colour c4"></span>
            <span class="colour c5"></span>
            <span class="colour c6"></span>
            <span class="colour c7"></span>
            <span class="colour c8"></span>
        </div>
    </div>
    <div class="general-section overrideCollapse">
        <h1>Inputs</h1>
        <div class="inputs">
            <input type="checkbox" name="" id="" />
            <input type="radio" name="" id="" />
            <input type="range" name="" id="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "ColourTest",
};
</script>

<style lang="scss" scoped>
.colours {
    height: 35px;
}
.colours .colour {
    display: inline-block;
    height: 30px;
    width: 30px;
    margin: 5px;
    border-radius: 5px;
}
.c1 {
    background-color: var(--main-brand-colour-100);
}
.c2 {
    background-color: var(--main-brand-colour-200);
}
.c3 {
    background-color: var(--main-brand-colour-300);
}
.c4 {
    background-color: var(--main-brand-colour-400);
}
.c5 {
    background-color: var(--main-brand-colour-500);
}
.c6 {
    background-color: var(--main-brand-colour-600);
}
.c7 {
    background-color: var(--main-brand-colour-700);
}
.c8 {
    background-color: var(--main-brand-colour-800);
}
</style>
