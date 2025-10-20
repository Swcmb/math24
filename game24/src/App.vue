<template>
  <div class="wrapper">
    <el-container>
      <el-header class="header">
        <div class="brand">24点游戏</div>
      </el-header>
      <el-main>
        <div class="center" :class="{ 'success-glow': isTwentyFour(evalState.value) }">
          <number-cards :numbers="numbers" :loading="loading" @reroll="handleReroll" @pick="appendNumber" />
          <expression-editor
            v-model="expression"
            :numbers="numbers"
            :locked="locked"
          />
          <div class="actions">
            <el-button type="primary" :disabled="locked" @click="onSubmit">提交尝试</el-button>
            <el-tag type="info" effect="dark">剩余次数：{{ attemptsLeft }}</el-tag>
            <el-text v-if="locked" type="warning">已锁定，请“重新抽取”开始新局</el-text>
          </div>
          <result-panel
            v-if="locked"
            :success="isTwentyFour(evalState.value)"
            :value="evalState.value"
            :expression="expression"
            @next="handleReroll"
          />
          <div class="status">
            <el-alert
              v-if="expression.trim().length === 0"
              title="请输入表达式开始校验"
              type="info"
              :closable="false"
              show-icon
            />
            <template v-else>
              <el-alert
                v-if="!evalState.ok"
                :title="'语法错误：' + evalState.errors.join('；')"
                type="error"
                :closable="false"
                show-icon
              />
              <el-alert
                v-else-if="!evalState.usesAllNumbers"
                title="数字使用不符合：必须且仅使用题面四个数字各一次"
                type="warning"
                :closable="false"
                show-icon
                class="mt8"
              />
              <el-alert
                v-else
                :title="isTwentyFour(evalState.value) ? '✅ 达成 24！' : '未达成 24'"
                :type="isTwentyFour(evalState.value) ? 'success' : 'warning'"
                :description="'当前结果：' + (evalState.value ?? '-')"
                :closable="false"
                show-icon
                class="mt8"
              />
            </template>
          </div>

        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script setup lang="ts">
// 顶层页面：加载不可能组合 → 生成合法四数 → 支持重新抽取
// 仅实现M1范围，不含表达式输入与校验

import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import NumberCards from './components/number-cards.vue'
import ExpressionEditor from './components/expression-editor.vue'
import ResultPanel from './components/result-panel.vue'
import { loadImpossibleSet, generateValidFour } from './utils/random'
import { validateAndEvalExpression, isTwentyFour } from './utils/eval24'

const numbers = ref<number[]>([])
const loading = ref<boolean>(false)
const expression = ref<string>('') // M2：表达式输入
const evalState = ref<{ ok: boolean; errors: string[]; value?: number; usesAllNumbers: boolean }>({
  ok: false,
  errors: [],
  value: undefined,
  usesAllNumbers: false
})
const attemptsLeft = ref<number>(3)   // M4：剩余尝试次数
const locked = ref<boolean>(false)    // M4：锁定态
let impossibleSet: Set<string> | null = null

function gen() {
  if (!impossibleSet) {
    return
  }
  const four = generateValidFour(impossibleSet)
  numbers.value = four
}

async function init() {
  loading.value = true
  // 加载不可能组合集合
  impossibleSet = await loadImpossibleSet()
  gen()
  expression.value = '' // 重置表达式
  evalState.value = { ok: false, errors: [], value: undefined, usesAllNumbers: false }
  attemptsLeft.value = 3
  locked.value = false
  loading.value = false
}

function handleReroll() {
  loading.value = true
  // 模拟异步体验
  setTimeout(() => {
    gen()
    loading.value = false
  }, 200)
}

// M4：提交尝试逻辑
function onSubmit() {
  if (locked.value) {
    ElMessage.warning('已锁定，请重新抽取开始新局')
    return
  }
  if (!evalState.value.ok) {
    ElMessage.error('表达式语法错误，无法提交')
    return
  }
  if (!evalState.value.usesAllNumbers) {
    ElMessage.warning('必须且仅使用题面四个数字各一次')
    return
  }
  // 扣减次数
  if (attemptsLeft.value <= 0) {
    locked.value = true
    ElMessage.error('没有剩余尝试次数')
    return
  }
  attemptsLeft.value -= 1

  if (isTwentyFour(evalState.value.value)) {
    locked.value = true
    ElMessage.success('恭喜，达成 24！本局已结束')
  } else {
    if (attemptsLeft.value === 0) {
      locked.value = true
      ElMessage.error('未达成 24，且已用尽尝试次数，本局结束')
    } else {
      ElMessage.info(`未达成 24，剩余尝试：${attemptsLeft.value}`)
    }
  }
}

onMounted(() => {
  init()
})

// 点击数字插入到表达式（避免数字连写：若末尾为数字则先加空格）
function appendNumber(n: number) {
  if (locked.value) return
  const cur = expression.value || ''
  const last = cur.trim().slice(-1)
  const needSpace = last && /[0-9)]/.test(last)
  expression.value = (cur + (needSpace ? ' ' : '') + String(n)).trim()
}

// 实时校验（M3）：表达式或题面数字变化时，立即校验与求值
watch([expression, numbers], ([expr, nums]) => {
  const r = validateAndEvalExpression(nums, expr || '')
  evalState.value = {
    ok: r.ok,
    errors: r.errors,
    value: r.value,
    usesAllNumbers: r.usesAllNumbers
  }
})
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header, .footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 1000;
  background: var(--el-bg-color);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.el-main {
  padding-top: 72px; /* 避让固定Header */
}
.brand {
  font-size: 20px;
  font-weight: 600;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
}
.actions,
.status {
  width: 680px;
  max-width: 96vw;
}
.mt8 { margin-top: 8px; }
@media (max-width: 768px) {
  .actions,
  .status {
    width: 100%;
    max-width: 100%;
  }
}
.success-glow {
  animation: glow 1.2s ease-in-out infinite alternate;
}
@keyframes glow {
  0% { box-shadow: 0 0 0 rgba(16,185,129,0); transform: translateY(0); }
  100% { box-shadow: 0 10px 30px rgba(16,185,129,0.25); transform: translateY(-2px); }
}
.actions {
  width: 680px;
  max-width: 96vw;
  display: flex;
  align-items: center;
  gap: 12px;
}
.status {
  width: 680px;
  max-width: 96vw;
}
.mt8 { margin-top: 8px; }
.status {
  width: 680px;
  max-width: 96vw;
}
.mt8 { margin-top: 8px; }
.hint {
  margin-top: 8px;
}
</style>