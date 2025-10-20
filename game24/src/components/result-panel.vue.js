const props = defineProps();
const valueDisplay = computed(() => (typeof props.value === 'number' ? props.value : '-'));
const subtitle = computed(() => (props.success ? '使用四个数字各一次，结果等于 24' : '可点击“下一局”重新开始'));
const __VLS_emit = defineEmits();
import { computed } from 'vue';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "result-card" },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "result-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "head" },
    });
    const __VLS_5 = {}.ElText;
    /** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        tag: "b",
    }));
    const __VLS_7 = __VLS_6({
        tag: "b",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    (__VLS_ctx.success ? '本局成功' : '本局结束');
    var __VLS_8;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content" },
});
const __VLS_9 = {}.ElResult;
/** @type {[typeof __VLS_components.ElResult, typeof __VLS_components.elResult, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    icon: (__VLS_ctx.success ? 'success' : 'error'),
    title: (__VLS_ctx.success ? '恭喜，达成 24！' : '未达成 24'),
    subTitle: (__VLS_ctx.subtitle),
}));
const __VLS_11 = __VLS_10({
    icon: (__VLS_ctx.success ? 'success' : 'error'),
    title: (__VLS_ctx.success ? '恭喜，达成 24！' : '未达成 24'),
    subTitle: (__VLS_ctx.subtitle),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "details" },
});
const __VLS_13 = {}.ElText;
/** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    type: "info",
}));
const __VLS_15 = __VLS_14({
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
var __VLS_16;
const __VLS_17 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    type: "info",
    effect: "light",
}));
const __VLS_19 = __VLS_18({
    type: "info",
    effect: "light",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
(__VLS_ctx.expression || '（无）');
var __VLS_20;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "details" },
});
const __VLS_21 = {}.ElText;
/** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    type: "info",
}));
const __VLS_23 = __VLS_22({
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
var __VLS_24;
const __VLS_25 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    type: (__VLS_ctx.success ? 'success' : 'warning'),
    effect: "light",
}));
const __VLS_27 = __VLS_26({
    type: (__VLS_ctx.success ? 'success' : 'warning'),
    effect: "light",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
(__VLS_ctx.valueDisplay);
var __VLS_28;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_29 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onClick: (...[$event]) => {
        __VLS_ctx.$emit('next');
    }
};
__VLS_32.slots.default;
var __VLS_32;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['result-card']} */ ;
/** @type {__VLS_StyleScopedClasses['head']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['details']} */ ;
/** @type {__VLS_StyleScopedClasses['details']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            valueDisplay: valueDisplay,
            subtitle: subtitle,
        };
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
