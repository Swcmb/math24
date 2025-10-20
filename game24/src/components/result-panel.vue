<template>
  <el-card class="result-card" shadow="hover">
    <template #header>
      <div class="head">
        <el-text tag="b">{{ success ? '本局成功' : '本局结束' }}</el-text>
      </div>
    </template>

    <div class="content">
      <el-result
        :icon="success ? 'success' : 'error'"
        :title="success ? '恭喜，达成 24！' : '未达成 24'"
        :sub-title="subtitle"
      />
      <div class="details">
        <el-text type="info">表达式：</el-text>
        <el-tag type="info" effect="light">{{ expression || '（无）' }}</el-tag>
      </div>
      <div class="details">
        <el-text type="info">结果：</el-text>
        <el-tag :type="success ? 'success' : 'warning'" effect="light">{{ valueDisplay }}</el-tag>
      </div>
    </div>

    <div class="actions">
      <el-button type="primary" @click="$emit('next')">下一局</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// 结果反馈面板：显示成功/失败、表达式与结果，并提供“下一局”
const props = defineProps<{
  success: boolean
  value?: number
  expression: string
}>()

const valueDisplay = computed(() => (typeof props.value === 'number' ? props.value : '-'))
const subtitle = computed(() => (props.success ? '使用四个数字各一次，结果等于 24' : '可点击“下一局”重新开始'))

defineEmits<{ (e: 'next'): void }>()
import { computed } from 'vue'
</script>

<style scoped>
.result-card {
  width: 680px;
  max-width: 96vw;
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.details {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.actions {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
</style>