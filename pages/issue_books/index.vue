<template>
  <v-card > <br>
    
  <VRow>
          <VCardText>
              <VTextField
                v-model="search"
                label="Search"
                placeholder="Search ..."
                append-inner-icon="ri-search-line"
              />
            </VCardText>
  
  <!-- 👉 Create Dialog  -->
        <VCol class="text-right">
  
                <VDialog  v-model="createDialog"  max-width=70%  >
                    <!-- Dialog Activator -->
                    <template #activator="{ props }">
                      <VBtn v-bind="props">
                       Issue Book
                      </VBtn>
                    </template>
  
                  <!-- Dialog Content -->
              <VCard title="Issue Book">
                    <DialogCloseBtn
                      variant="text"
                      size="default"
                      @click="createDialog = false"
                    />
                <VCardText>
                  <VForm  ref="refDataForm" >
                    <VRow>

                    <!-- 👉 Book Name -->
                    <VCol cols="12"         
                    >
                    <VAutocomplete
                    label="Book Name"
                    :items="books"
                    item-title="book_name"
                    item-value="book_Id"
                    v-model="dataForm.book_Id"
                    placeholder="Select Book"
                    :rules="[requiredValidator]"
                  />
                  </VCol>


                  <!-- 👉 Employee Id -->
                  <VCol cols="12"     
                    >
                  <VAutocomplete
                  label="Employee Id"
                  :items="userlogins.map(x=> x.userName)"
                  item-title="Employee Id"
                  v-model="dataForm.employee_Id"
                  placeholder="Select Employee Name"
                  :rules="[requiredValidator]"
                 />
                </VCol>


                  <!-- 👉 Due Date -->
                  <VCol cols="12"      
                    >
                  <AppDateTimePicker
                  v-model="dataForm.due_Date"
                  label="Due Date"
                  placeholder="Select Due Date"
                  :config="{ inline: true }"
                  :rules="[requiredValidator]"
                />

                </VCol>

                  <VCol offset-md="3"  cols="12"  md="9" class="d-flex gap-4" >                          
                                     <VSpacer />
                                  <VBtn color="success" @click="validateDataForm"> Save  </VBtn>
                                  <VBtn color="error"  @click="createDialog = false" > Close </VBtn>
                                  <VBtn color="secondary"  type="reset"  > Reset    </VBtn>
                    </VCol>
  
                </VRow>
             </VForm>
          </VCardText>
      </VCard>
                  
    </VDialog>
  
        </VCol>
      </VRow>
      
   <!--End of Dialog  -->
  
  
  
  <!-- 👉 Data Table  --> 
  <VDataTable
      :headers="headers"
      :items="issueBooks"
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
  

        <!-- Actions -->
        <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn color="warning" size="small" >
            <VIcon  icon="ri-pencil-line"  @click="editItem(item)" />
          </IconBtn>
          <IconBtn color="error" size="small"  @click="deleteItem(item)"   >
            <VIcon icon="ri-delete-bin-line" />
          </IconBtn>
        </div>
      </template>
    </VDataTable>
  
  <!--End of Data Table  -->
  
  </v-card>
  
  
  
  <!-- 👉 Delete Dialog  -->
  <VDialog   v-model="deleteDialog"  max-width="500px"  >
      <VCard>
        <VCardTitle>
          Are you sure you want to delete this item?
        </VCardTitle>
  
        <VCardActions>
          <VSpacer />
          <VBtn  color="success"  variant="elevated"  @click="removeCategory(delete_var)" > OK </VBtn>
          <VBtn color="error" variant="outlined" @click="deleteDialog = false" > Cancel  </VBtn>
          <VSpacer />
        </VCardActions>
      </VCard>
  </VDialog>
  <!--End of Delete Dialog  -->
  
      <!-- 👉 Edit Dialog  -->
      
      <!-- End of Edit Dialog  -->
   
  </template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/components/VForm';

    // Book store
    const bookStore = useBookStore()
    const {getAllBook} = bookStore;     
    // get data on page load       
    await getAllBook(),{ initialCache: false }
    const {books} = storeToRefs(bookStore);


        // Employee store
    const userLoginStore = useUserLoginStore()
    const { getAllEmplolyee, } = userLoginStore
    // get data on page load
    await getAllEmplolyee(), { initialCache: false }
    const { userlogins } = storeToRefs(userLoginStore)


    // Issue Book store
    const issueBookStore = useIssueBookStore()
    const {getAllIssueBook, create ,remove} = issueBookStore;     
    // get data on page load       
    await getAllIssueBook(),{ initialCache: false }
    const {issueBooks} = storeToRefs(issueBookStore);

      // Method used to remove Isssue Book
	const removeCategory = async (item :any) => {
		await issueBookStore.remove(item._id);
    deleteDialog.value = false;
	};


  //* ***************Start CRUD Dialog********************
const createDialog = ref(false)
const refDataForm = ref<VForm>()
const dataForm = ref({
  book_Id: null,
 // due_Date: new Date('2024-07-25T09:54:17.989Z'),
 due_Date: '',
  employee_Id: null,
})

const editDialog = ref(false)
let edit_var: any

const editItem = (item: any) => {
  editDialog.value = true
  dataForm.value = item
  edit_var = item
}

const deleteDialog = ref(false)
let delete_var: any

const deleteItem = (item: any) => {
  deleteDialog.value = true
  delete_var = item
}

//* ***************End CRUD Dialog********************


const validateDataForm =  () => {
  console.log("dataForm.value : ",dataForm.value)
   refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      let item : IIssueBook = {
        book_Id : Number(dataForm.value.book_Id) ,
        due_Date : new Date(dataForm.value.due_Date ),
        employee_Id : String(dataForm.value.employee_Id) ,
        }

        issueBookStore.create(item);
      refDataForm.value?.reset();
    }
    else {  }     
  })
} // End of validatedataForm()''

const validateEditDataForm = () => {
  refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      let item : IIssueBook = {
        book_Id : Number(dataForm.value.book_Id) ,
        due_Date : new Date(dataForm.value.due_Date ),
        employee_Id : String(dataForm.value.employee_Id) ,
        }
        issueBookStore.update(edit_var._id, item)
    }
    else { }
  })
} // End of validateEditDataForm()

const headers = [
  { title: 'STOCK NO', key: 'book_Id' },
  { title: 'BOOK NAME', key: 'book_name' },
  { title: 'Employee ID', key: 'employee_Id' },
  { title: 'Employee Name', key: 'employee_Name' },
  { title: 'Issue date', key:'issue_Date'},
  { title: 'Due date', key:'due_Date'},
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions' },
]

const search = ref('')


const resolveStatusColor = (status: string) => {
  if (status === 'Issued')
    return 'success'
  if (status === 'Completed')
    return 'warning'
  if (status === 'Cancelled')
    return 'error'
}


</script>
