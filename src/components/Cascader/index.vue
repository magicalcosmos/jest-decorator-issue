<template>
  <section :class="`${tagClass} cascader-main`" :style="`width:${width}`" >
    <div :class="`${tagClass} cascader-input ${ isShowEdit || isEditing ? 'edit' : ''}`" :title="currentValue" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <span v-if="!isShowEdit && !isEditing" v-html="currentDisplayValue">
      </span>
      <input ref="refInput" v-if="isShowEdit || isEditing" class="input" type="text" v-model="currentValue" @focus="handleFocus" @blur="handleBlur" :placeholder="$t('select.select_please')"/>
      <i v-if="isShowEdit || isEditing" :class="isClose ? 'r-icon-arrow-down' : 'r-icon-arrow-up'" @click="handleClick" :data-order="+new Date()"></i>
    </div>
    <cascader-options
      ref="refCascaderOptions"
      v-model="currentValue"
      order="rightToLeft"
      :visible="isShowOptons"
      :style="cascaderStyle"
      :path="path"
      :except="currentExcept"
      :tagClass="tagClass"
      @selected="handleCascaderSelected"
    ></cascader-options>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
