<template>
  <div class="footer">
    <div class="footer-item">
      <div>Developed by XJ</div>
      <div>2024</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  color: var(--prism-comment);
  font-size: 16px;
  height: 100%;

  display: flex;
  justify-content: space-around;

  .footer-item {
    display: flex;
    justify-content: space-between;
    width: 25%;
    padding: 10px 20px;
    align-items: center;
    border-right: 1px solid var(--prism-comment);

    &:last-child {
      border-right: none;
    }
  }
}
</style>
