<template>
  <div
    class="virtual-scroll-container"
    :class="{ 'hide-scrollbar': !showScrollbar }"
    :style="containerStyle"
    @scroll="handleScroll"
    ref="refScrollContainer"
  >
    <ul class="virtual-scroll-list" ref="refScroll" :style="blankFillStyle" :class="ulClass">
      <li class="virtual-scroll-li" :class="liClass" v-for="(li, index) in visibleData" :key="index">
        <div
          class="r-table__expand-icon"
          v-if='isTree && li.hasChildren === true'
          @click='handleExpand(li)'
        >
          <i :class="`iconfont ${expandIcon} ${!li.expanded ? foldIcon : ''}`"></i>
        </div>
        <slot name="scrollItem" :item="li" :backup="li" :itemIndex="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
