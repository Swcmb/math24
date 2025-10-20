const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
/** @type {__VLS_StyleScopedClasses['num-tag']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "number-cards" },
});
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "box-card" },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "box-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "numbers" },
});
for (const [n, i] of __VLS_getVForSourceType((__VLS_ctx.numbers))) {
    const __VLS_4 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onClick': {} },
        key: (i),
        size: "large",
        type: "info",
        effect: "dark",
        ...{ class: "num-tag clickable" },
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClick': {} },
        key: (i),
        size: "large",
        type: "info",
        effect: "dark",
        ...{ class: "num-tag clickable" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('pick', n);
        }
    };
    __VLS_7.slots.default;
    (n);
    var __VLS_7;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_12 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (...[$event]) => {
        __VLS_ctx.$emit('reroll');
    }
};
__VLS_15.slots.default;
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['number-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
/** @type {__VLS_StyleScopedClasses['numbers']} */ ;
/** @type {__VLS_StyleScopedClasses['num-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
