<template>
  <!-- 数字展示卡与重新抽取按钮 -->
  <div class="number-cards">
    <el-card class="box-card" shadow="hover">
      <div class="numbers">
        <el-tag
          v-for="(n, i) in numbers"
          :key="i"
          size="large"
          type="info"
          effect="dark"
          class="num-tag clickable"
          @click="$emit('pick', n)"
        >
          {{ n }}
        </el-tag>
      </div>
      <div class="actions">
        <el-button type="primary" :loading="loading" @click="$emit('reroll')">重新抽取</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 组件：仅负责展示四个数字与触发“重新抽取”事件
// 使用 Element Plus 的 Tag 与 Button 进行UI呈现

defineProps<{
  numbers: number[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'reroll'): void
  (e: 'pick', n: number): void
}>()
</script>

<style scoped>
.number-cards {
  display: flex;
  justify-content: center;
}
.box-card {
  width: 520px;
  max-width: 94vw;
}
.numbers {
  display: flex;
  gap: 12px;
  justify-content: center;
  padding: 8px 0 16px 0;
  flex-wrap: wrap;
}
.num-tag {
  font-size: 22px;
  padding: 12px 16px;
}
.clickable {
  cursor: pointer;
  user-select: none;
}
.clickable:hover {
  filter: brightness(1.05);
}
.actions {
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  .box-card { width: 100%; max-width: 100%; }
  .num-tag { font-size: 20px; padding: 10px 14px; }
}
</style>