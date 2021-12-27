<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template v-for="item in routes">

      <router-link
        v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
        :key="item.children[0].name"
        :to="item.path+'/'+item.children[0].path">
        <r-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{ item.children[0].meta.title }}</span>
        </r-menu-item>
      </router-link>

      <r-submenu v-else :key="item.name" :index="item.name||item.path">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{ item.meta.title }}</span>
        </template>
        <div v-if="!child.hidden">
          <template v-for="child in item.children">
            <sidebar-item v-if="child.children&&child.children.length>0" :key="child.path" :is-nest="true" class="nest-menu" :routes="[child]"></sidebar-item>

            <router-link v-else :key="child.name" :to="item.path+'/'+child.path">
              <r-menu-item :index="item.path+'/'+child.path">
                <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                <span v-if="child.meta&&child.meta.title" slot="title">{{ child.meta.title }}</span>
              </r-menu-item>
            </router-link>
          </template>
        </div>
      </r-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      return showingChildren.length === 1;
    }
  }
};
</script>
