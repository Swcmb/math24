import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import NumberCards from './components/number-cards.vue';
import ExpressionEditor from './components/expression-editor.vue';
import ResultPanel from './components/result-panel.vue';
import { loadImpossibleSet, generateValidFour } from './utils/random';
import { validateAndEvalExpression, isTwentyFour } from './utils/eval24';
const numbers = ref([]);
const loading = ref(false);
const expression = ref(''); // M2：表达式输入
const evalState = ref({
    ok: false,
    errors: [],
    value: undefined,
    usesAllNumbers: false
});
const attemptsLeft = ref(3); // M4：剩余尝试次数
const locked = ref(false); // M4：锁定态
let impossibleSet = null;
function gen() {
    if (!impossibleSet) {
        return;
    }
    const four = generateValidFour(impossibleSet);
    numbers.value = four;
}
async function init() {
    loading.value = true;
    // 加载不可能组合集合
    impossibleSet = await loadImpossibleSet();
    gen();
    expression.value = ''; // 重置表达式
    evalState.value = { ok: false, errors: [], value: undefined, usesAllNumbers: false };
    attemptsLeft.value = 3;
    locked.value = false;
    loading.value = false;
}
function handleReroll() {
    loading.value = true;
    // 模拟异步体验
    setTimeout(() => {
        gen();
        loading.value = false;
    }, 200);
}
// M4：提交尝试逻辑
function onSubmit() {
    if (locked.value) {
        ElMessage.warning('已锁定，请重新抽取开始新局');
        return;
    }
    if (!evalState.value.ok) {
        ElMessage.error('表达式语法错误，无法提交');
        return;
    }
    if (!evalState.value.usesAllNumbers) {
        ElMessage.warning('必须且仅使用题面四个数字各一次');
        return;
    }
    // 扣减次数
    if (attemptsLeft.value <= 0) {
        locked.value = true;
        ElMessage.error('没有剩余尝试次数');
        return;
    }
    attemptsLeft.value -= 1;
    if (isTwentyFour(evalState.value.value)) {
        locked.value = true;
        ElMessage.success('恭喜，达成 24！本局已结束');
    }
    else {
        if (attemptsLeft.value === 0) {
            locked.value = true;
            ElMessage.error('未达成 24，且已用尽尝试次数，本局结束');
        }
        else {
            ElMessage.info(`未达成 24，剩余尝试：${attemptsLeft.value}`);
        }
    }
}
onMounted(() => {
    init();
});
// 点击数字插入到表达式（避免数字连写：若末尾为数字则先加空格）
function appendNumber(n) {
    if (locked.value)
        return;
    const cur = expression.value || '';
    const last = cur.trim().slice(-1);
    const needSpace = last && /[0-9)]/.test(last);
    expression.value = (cur + (needSpace ? ' ' : '') + String(n)).trim();
}
// 实时校验（M3）：表达式或题面数字变化时，立即校验与求值
watch([expression, numbers], ([expr, nums]) => {
    const r = validateAndEvalExpression(nums, expr || '');
    evalState.value = {
        ok: r.ok,
        errors: r.errors,
        value: r.value,
        usesAllNumbers: r.usesAllNumbers
    };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['mt8']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['mt8']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wrapper" },
});
const __VLS_0 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElHeader;
/** @type {[typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "header" },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "brand" },
});
var __VLS_7;
const __VLS_8 = {}.ElMain;
/** @type {[typeof __VLS_components.ElMain, typeof __VLS_components.elMain, typeof __VLS_components.ElMain, typeof __VLS_components.elMain, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "center" },
    ...{ class: ({ 'success-glow': __VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value) }) },
});
/** @type {[typeof NumberCards, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(NumberCards, new NumberCards({
    ...{ 'onReroll': {} },
    ...{ 'onPick': {} },
    numbers: (__VLS_ctx.numbers),
    loading: (__VLS_ctx.loading),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onReroll': {} },
    ...{ 'onPick': {} },
    numbers: (__VLS_ctx.numbers),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
let __VLS_17;
const __VLS_18 = {
    onReroll: (__VLS_ctx.handleReroll)
};
const __VLS_19 = {
    onPick: (__VLS_ctx.appendNumber)
};
var __VLS_14;
/** @type {[typeof ExpressionEditor, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(ExpressionEditor, new ExpressionEditor({
    modelValue: (__VLS_ctx.expression),
    numbers: (__VLS_ctx.numbers),
    locked: (__VLS_ctx.locked),
}));
const __VLS_21 = __VLS_20({
    modelValue: (__VLS_ctx.expression),
    numbers: (__VLS_ctx.numbers),
    locked: (__VLS_ctx.locked),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_23 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ 'onClick': {} },
    type: "primary",
    disabled: (__VLS_ctx.locked),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClick': {} },
    type: "primary",
    disabled: (__VLS_ctx.locked),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onClick: (__VLS_ctx.onSubmit)
};
__VLS_26.slots.default;
var __VLS_26;
const __VLS_31 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    type: "info",
    effect: "dark",
}));
const __VLS_33 = __VLS_32({
    type: "info",
    effect: "dark",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_34.slots.default;
(__VLS_ctx.attemptsLeft);
var __VLS_34;
if (__VLS_ctx.locked) {
    const __VLS_35 = {}.ElText;
    /** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        type: "warning",
    }));
    const __VLS_37 = __VLS_36({
        type: "warning",
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_38.slots.default;
    var __VLS_38;
}
if (__VLS_ctx.locked) {
    /** @type {[typeof ResultPanel, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(ResultPanel, new ResultPanel({
        ...{ 'onNext': {} },
        success: (__VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value)),
        value: (__VLS_ctx.evalState.value),
        expression: (__VLS_ctx.expression),
    }));
    const __VLS_40 = __VLS_39({
        ...{ 'onNext': {} },
        success: (__VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value)),
        value: (__VLS_ctx.evalState.value),
        expression: (__VLS_ctx.expression),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    let __VLS_42;
    let __VLS_43;
    let __VLS_44;
    const __VLS_45 = {
        onNext: (__VLS_ctx.handleReroll)
    };
    var __VLS_41;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status" },
});
if (__VLS_ctx.expression.trim().length === 0) {
    const __VLS_46 = {}.ElAlert;
    /** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        title: "请输入表达式开始校验",
        type: "info",
        closable: (false),
        showIcon: true,
    }));
    const __VLS_48 = __VLS_47({
        title: "请输入表达式开始校验",
        type: "info",
        closable: (false),
        showIcon: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
}
else {
    if (!__VLS_ctx.evalState.ok) {
        const __VLS_50 = {}.ElAlert;
        /** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
            title: ('语法错误：' + __VLS_ctx.evalState.errors.join('；')),
            type: "error",
            closable: (false),
            showIcon: true,
        }));
        const __VLS_52 = __VLS_51({
            title: ('语法错误：' + __VLS_ctx.evalState.errors.join('；')),
            type: "error",
            closable: (false),
            showIcon: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    }
    else if (!__VLS_ctx.evalState.usesAllNumbers) {
        const __VLS_54 = {}.ElAlert;
        /** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
            title: "数字使用不符合：必须且仅使用题面四个数字各一次",
            type: "warning",
            closable: (false),
            showIcon: true,
            ...{ class: "mt8" },
        }));
        const __VLS_56 = __VLS_55({
            title: "数字使用不符合：必须且仅使用题面四个数字各一次",
            type: "warning",
            closable: (false),
            showIcon: true,
            ...{ class: "mt8" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    }
    else {
        const __VLS_58 = {}.ElAlert;
        /** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
        // @ts-ignore
        const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
            title: (__VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value) ? '✅ 达成 24！' : '未达成 24'),
            type: (__VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value) ? 'success' : 'warning'),
            description: ('当前结果：' + (__VLS_ctx.evalState.value ?? '-')),
            closable: (false),
            showIcon: true,
            ...{ class: "mt8" },
        }));
        const __VLS_60 = __VLS_59({
            title: (__VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value) ? '✅ 达成 24！' : '未达成 24'),
            type: (__VLS_ctx.isTwentyFour(__VLS_ctx.evalState.value) ? 'success' : 'warning'),
            description: ('当前结果：' + (__VLS_ctx.evalState.value ?? '-')),
            closable: (false),
            showIcon: true,
            ...{ class: "mt8" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    }
}
var __VLS_11;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['status']} */ ;
/** @type {__VLS_StyleScopedClasses['mt8']} */ ;
/** @type {__VLS_StyleScopedClasses['mt8']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NumberCards: NumberCards,
            ExpressionEditor: ExpressionEditor,
            ResultPanel: ResultPanel,
            isTwentyFour: isTwentyFour,
            numbers: numbers,
            loading: loading,
            expression: expression,
            evalState: evalState,
            attemptsLeft: attemptsLeft,
            locked: locked,
            handleReroll: handleReroll,
            onSubmit: onSubmit,
            appendNumber: appendNumber,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
