<template>
    <div>
      <header-app></header-app>
      <router-view></router-view>
    </div>
</template>

<script>
import Header from '@/home/Header'

export default {
    name: 'home', 
    components: {
      'header-app': Header,
    },

};
</script>