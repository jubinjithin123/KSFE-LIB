<template>

  <VCard title="Overview">
      <VCardText>
        <VRow>
          <VCol
            v-for="item in statistics"
            :key="item.title"
            cols="12"
            sm="4"
          >
            <div class="d-flex align-center">
              <VAvatar
                :color="item.color"
                rounded
                size="40"
                class="elevation-1 me-3"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>

              <div class="d-flex flex-column">
                <div class="text-body-1">
                  {{ item.title }}
                </div>
                <h5 class="text-h5">
                  {{ item.stats }}
                </h5>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
  </VCard> <!--title="Overview"-->


  <br>

  <v-card title="Due List"> 
    
    <VRow>
          <VCardText>
              <VTextField
                v-model="search"
                label="Search"
                placeholder="Search ..."
                append-inner-icon="ri-search-line"
              />
            </VCardText>
    </VRow>
      
  
  <!-- 👉 Data Table  --> 
  <VDataTable
      :headers="headers"
      :items="defaultIssueBooks"
      :items-per-page="10"
      :search="search"
      class="text-no-wrap"
    >

      <!-- Status -->
        <template #item.status="{item}">
        <VChip
          :color="resolveStatusColor(item.status)"
          :class="`text-${resolveStatusColor(item.status)}`"
          size="small"
          class="font-weight-medium"
        >
          {{ item.status }}
        </VChip>
      </template>
  
    </VDataTable>
  
  <!--End of Data Table  -->
  </v-card>
  
  

</template>


<script setup lang="ts">

import { storeToRefs } from 'pinia';
//import { VForm } from 'vuetify/components/VForm';

    // Default Issue Book store
    const defaultIssueBookStore = useDefaultIssueBookStore()
    const {getAllDefaultIssueBook, } = defaultIssueBookStore;   
        // get data on page load       
        await getAllDefaultIssueBook(),{ initialCache: false }
    const {defaultIssueBooks} = storeToRefs(defaultIssueBookStore);

    const statistics = [
  {
    title: 'Total Books',
    stats: '2785',
    icon: 'ri-pie-chart-2-line',
    color: 'primary',
  },
  {
    title: 'Available',
    stats: '1754',
    icon: 'ri-group-line',
    color: 'success',
  },
  {
    title: 'Issued',
    stats: '245',
    icon: 'ri-macbook-line',
    color: 'warning',
  },
  
]


const headers = [
  { title: 'STOCK NO', key: 'book_Id' },
  { title: 'BOOK NAME', key: 'book_name' },
  { title: 'Employee ID', key: 'employee_Id' },
  { title: 'Employee Name', key: 'employee_Name' },
  { title: 'Issue date', key:'issue_Date'},
  { title: 'Due date', key:'due_Date'},
  { title: 'STATUS', key: 'status' },
  { title: 'MOBILE NUMBER', key: 'mobileNo' },
]

const search = ref('')


const resolveStatusColor = (status: string) => {
  if (status === 'Issued')
    return 'error'
}

</script>
