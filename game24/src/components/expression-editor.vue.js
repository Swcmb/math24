import { computed, watch, ref } from 'vue';
const props = defineProps();
const emit = defineEmits();
const innerValue = ref(props.modelValue ?? '');
// 同步外部 v-model 变化
watch(() => props.modelValue, v => {
    if (v !== innerValue.value) {
        innerValue.value = v ?? '';
    }
});
// 输入时向父级回传
function onInput(v) {
    emit('update:modelValue', innerValue.value);
}
// 插入便捷符号
function insert(sym) {
    const el = innerValue.value;
    innerValue.value = el + sym;
    emit('update:modelValue', innerValue.value);
}
// 退格
function backspace() {
    if (!innerValue.value)
        return;
    innerValue.value = innerValue.value.slice(0, -1);
    emit('update:modelValue', innerValue.value);
}
// 清空
function clearAll() {
    innerValue.value = '';
    emit('update:modelValue', innerValue.value);
}
// 提取表达式中出现的“数字”提示（简单解析：识别1~13的整数片段）
const usedNumbers = computed(() => {
    const text = innerValue.value || '';
    const matches = text.match(/\d+/g) || [];
    // 将 >=14 的数字也会被捕获，这里仅保留 1~13 作为提示
    const nums = matches
        .map(s => Number(s))
        .filter(n => Number.isFinite(n) && n >= 1 && n <= 13);
    return nums;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "expr-card" },
    shadow: "hover",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "expr-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_5 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        size: "small",
        type: "info",
    }));
    const __VLS_7 = __VLS_6({
        size: "small",
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    var __VLS_8;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-row" },
});
const __VLS_9 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.innerValue),
    disabled: (__VLS_ctx.locked),
    placeholder: "请输入表达式，例如：(8-3)*(2+2)",
    clearable: true,
    size: "large",
}));
const __VLS_11 = __VLS_10({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.innerValue),
    disabled: (__VLS_ctx.locked),
    placeholder: "请输入表达式，例如：(8-3)*(2+2)",
    clearable: true,
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onInput: (__VLS_ctx.onInput)
};
var __VLS_12;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "buttons" },
});
const __VLS_17 = {}.ElButtonGroup;
/** @type {[typeof __VLS_components.ElButtonGroup, typeof __VLS_components.elButtonGroup, typeof __VLS_components.ElButtonGroup, typeof __VLS_components.elButtonGroup, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ class: "btn-row" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "btn-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
const __VLS_21 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}));
const __VLS_23 = __VLS_22({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_25;
let __VLS_26;
let __VLS_27;
const __VLS_28 = {
    onClick: (...[$event]) => {
        __VLS_ctx.insert(' + ');
    }
};
__VLS_24.slots.default;
var __VLS_24;
const __VLS_29 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onClick: (...[$event]) => {
        __VLS_ctx.insert(' - ');
    }
};
__VLS_32.slots.default;
var __VLS_32;
const __VLS_37 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_41;
let __VLS_42;
let __VLS_43;
const __VLS_44 = {
    onClick: (...[$event]) => {
        __VLS_ctx.insert(' * ');
    }
};
__VLS_40.slots.default;
var __VLS_40;
const __VLS_45 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}));
const __VLS_47 = __VLS_46({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_49;
let __VLS_50;
let __VLS_51;
const __VLS_52 = {
    onClick: (...[$event]) => {
        __VLS_ctx.insert(' / ');
    }
};
__VLS_48.slots.default;
var __VLS_48;
const __VLS_53 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
let __VLS_59;
const __VLS_60 = {
    onClick: (...[$event]) => {
        __VLS_ctx.insert('(');
    }
};
__VLS_56.slots.default;
var __VLS_56;
const __VLS_61 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}));
const __VLS_63 = __VLS_62({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
let __VLS_65;
let __VLS_66;
let __VLS_67;
const __VLS_68 = {
    onClick: (...[$event]) => {
        __VLS_ctx.insert(')');
    }
};
__VLS_64.slots.default;
var __VLS_64;
var __VLS_20;
const __VLS_69 = {}.ElButtonGroup;
/** @type {[typeof __VLS_components.ElButtonGroup, typeof __VLS_components.elButtonGroup, typeof __VLS_components.ElButtonGroup, typeof __VLS_components.elButtonGroup, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    ...{ class: "btn-row" },
}));
const __VLS_71 = __VLS_70({
    ...{ class: "btn-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
__VLS_72.slots.default;
const __VLS_73 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
    type: "warning",
    plain: true,
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
    type: "warning",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onClick: (__VLS_ctx.backspace)
};
__VLS_76.slots.default;
var __VLS_76;
const __VLS_81 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
    type: "danger",
    plain: true,
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.locked),
    size: "large",
    ...{ class: "kbd-btn" },
    type: "danger",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_85;
let __VLS_86;
let __VLS_87;
const __VLS_88 = {
    onClick: (__VLS_ctx.clearAll)
};
__VLS_84.slots.default;
var __VLS_84;
var __VLS_72;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "used-hint" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hint-title" },
});
const __VLS_89 = {}.ElText;
/** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    type: "info",
}));
const __VLS_91 = __VLS_90({
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
__VLS_92.slots.default;
var __VLS_92;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nums" },
});
for (const [n, i] of __VLS_getVForSourceType((__VLS_ctx.numbers))) {
    const __VLS_93 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        key: ('q' + i),
        size: "small",
        effect: "plain",
    }));
    const __VLS_95 = __VLS_94({
        key: ('q' + i),
        size: "small",
        effect: "plain",
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    __VLS_96.slots.default;
    (n);
    var __VLS_96;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hint-title" },
});
const __VLS_97 = {}.ElText;
/** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    type: "info",
}));
const __VLS_99 = __VLS_98({
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
__VLS_100.slots.default;
var __VLS_100;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nums" },
});
for (const [n, i] of __VLS_getVForSourceType((__VLS_ctx.usedNumbers))) {
    const __VLS_101 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        key: ('u' + i),
        size: "small",
        type: "success",
        effect: "plain",
    }));
    const __VLS_103 = __VLS_102({
        key: ('u' + i),
        size: "small",
        type: "success",
        effect: "plain",
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_104.slots.default;
    (n);
    var __VLS_104;
}
if (__VLS_ctx.usedNumbers.length === 0) {
    const __VLS_105 = {}.ElText;
    /** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        type: "info",
    }));
    const __VLS_107 = __VLS_106({
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    __VLS_108.slots.default;
    var __VLS_108;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['expr-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['input-row']} */ ;
/** @type {__VLS_StyleScopedClasses['buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-row']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-row']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['kbd-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['used-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['hint-title']} */ ;
/** @type {__VLS_StyleScopedClasses['nums']} */ ;
/** @type {__VLS_StyleScopedClasses['hint-title']} */ ;
/** @type {__VLS_StyleScopedClasses['nums']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            innerValue: innerValue,
            onInput: onInput,
            insert: insert,
            backspace: backspace,
            clearAll: clearAll,
            usedNumbers: usedNumbers,
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
