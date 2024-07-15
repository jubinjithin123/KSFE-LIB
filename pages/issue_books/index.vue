
<template>

</template>


<script setup lang="ts">

import { storeToRefs } from 'pinia';

    // Book store
    const bookStore = useBookStore()
    const {getAllBook, create ,remove} = bookStore;     
    // get data on page load       
    await getAllBook(),{ initialCache: false }
    const {books} = storeToRefs(bookStore);

    


</script>
