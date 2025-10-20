<template>
  <el-card class="expr-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>表达式编辑</span>
        <el-tag size="small" type="info">仅使用 + - * / 和括号</el-tag>
      </div>
    </template>

    <div class="input-row">
      <el-input
        v-model="innerValue"
        :disabled="locked"
        placeholder="请输入表达式，例如：(8-3)*(2+2)"
        clearable
        size="large"
        @input="onInput"
      />
    </div>

    <div class="buttons">
      <el-button-group class="btn-row">
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="insert(' + ')">+</el-button>
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="insert(' - ')">-</el-button>
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="insert(' * ')">*</el-button>
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="insert(' / ')">/</el-button>
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="insert('(')">(</el-button>
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="insert(')')">)</el-button>
      </el-button-group>
      <el-button-group class="btn-row">
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="backspace" type="warning" plain>退格</el-button>
        <el-button :disabled="locked" size="large" class="kbd-btn" @click="clearAll" type="danger" plain>清空</el-button>
      </el-button-group>
    </div>

    <div class="used-hint">
      <div class="hint-title">
        <el-text type="info">题面数字：</el-text>
        <div class="nums">
          <el-tag v-for="(n,i) in numbers" :key="'q'+i" size="small" effect="plain">{{ n }}</el-tag>
        </div>
      </div>
      <div class="hint-title">
        <el-text type="info">已在表达式中出现的数字（提示）：</el-text>
        <div class="nums">
          <el-tag
            v-for="(n,i) in usedNumbers"
            :key="'u'+i"
            size="small"
            type="success"
            effect="plain"
          >{{ n }}</el-tag>
          <el-text v-if="usedNumbers.length===0" type="info">尚未使用数字</el-text>
        </div>
      </div>

    </div>
  </el-card>
</template>

<script setup lang="ts">
// 表达式编辑组件（M2）：输入框 + 快捷按钮 + 已用数字提示
// 说明：不做合法性校验与求值，这部分在 M3 实现

import { computed, watch, ref } from 'vue'

const props = defineProps<{
  modelValue: string
  numbers: number[]
  locked?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const innerValue = ref(props.modelValue ?? '')

// 同步外部 v-model 变化
watch(() => props.modelValue, v => {
  if (v !== innerValue.value) {
    innerValue.value = v ?? ''
  }
})

// 输入时向父级回传
function onInput(v: string) {
  emit('update:modelValue', innerValue.value)
}

// 插入便捷符号
function insert(sym: string) {
  const el = innerValue.value
  innerValue.value = el + sym
  emit('update:modelValue', innerValue.value)
}

// 退格
function backspace() {
  if (!innerValue.value) return
  innerValue.value = innerValue.value.slice(0, -1)
  emit('update:modelValue', innerValue.value)
}

// 清空
function clearAll() {
  innerValue.value = ''
  emit('update:modelValue', innerValue.value)
}

// 提取表达式中出现的“数字”提示（简单解析：识别1~13的整数片段）
const usedNumbers = computed<number[]>(() => {
  const text = innerValue.value || ''
  const matches = text.match(/\d+/g) || []
  // 将 >=14 的数字也会被捕获，这里仅保留 1~13 作为提示
  const nums = matches
    .map(s => Number(s))
    .filter(n => Number.isFinite(n) && n >= 1 && n <= 13)
  return nums
})
</script>

<style scoped>
.expr-card {
  width: 680px;
  max-width: 96vw;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-row {
  display: flex;
  margin-bottom: 12px;
}
.buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.kbd-btn {
  min-width: 48px;
}
@media (max-width: 768px) {
  .kbd-btn {
    flex: 1 1 auto;
    min-width: 64px;
  }
}
.used-hint {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hint-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.nums {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>