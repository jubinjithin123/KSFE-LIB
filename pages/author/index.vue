<template>
  <VContainer>

<!-- 👉 Create Dialog  -->
    <VRow>
      <VCol class="text-right">

              <VDialog  v-model="createDialog"  max-width="600"  >
                  <!-- Dialog Activator -->
                  <template #activator="{ props }">
                    <VBtn v-bind="props">
                      Add New Author
                    </VBtn>
                  </template>

                <!-- Dialog Content -->
                <VCard title="Author">
                  <DialogCloseBtn
                    variant="text"
                    size="default"
                    @click="createDialog = false"
                  />
                  <VCardText>
                  <VForm  ref="refDataForm" >
                            <VRow>
                              <VCol  cols="12" >
                                <VTextField
                                  v-model="dataForm.author_name"
                                  label="Author Name"
                                  placeholder="Enter Author Name"
                                  :rules="[requiredValidator,lengthValidator(dataForm.author_name,3)]"
                                 
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

  <VCardText>
    <VRow>
      <VCol
        cols="12"
        offset-md="8"
        md="4"
      >
        <VTextField
          v-model="search"
          label="Search"
          placeholder="Search ..."
          append-inner-icon="ri-search-line"
          single-line
          hide-details
          dense
          outlined
        />
      </VCol>
    </VRow>
  </VCardText>

<!-- 👉 Data Table  --> 

  <VDataTable
    :headers="headers"
    :items="author"
    :items-per-page="10"
    :search="search"
    class="text-no-wrap"
  >

      <!-- Actions -->
      <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <IconBtn color="warning" size="small" >
          <VIcon icon="ri-pencil-line" />
        </IconBtn>
        <IconBtn color="error" size="small"  @click="deleteItem(item)"   >
          <VIcon icon="ri-delete-bin-line" />
        </IconBtn>
      </div>
    </template>

  </VDataTable>

<!--End of Data Table  -->





<!-- 👉 Delete Dialog  -->
<VDialog   v-model="deleteDialog"  max-width="500px"  >
    <VCard>
      <VCardTitle>
        Are you sure you want to delete this item?
      </VCardTitle>

      <VCardActions>
        <VSpacer />
        <VBtn  color="success"  variant="elevated"  @click="removeAuthor(delete_var)" > OK </VBtn>
        <VBtn color="error" variant="outlined" @click="deleteDialog = false" > Cancel  </VBtn>
        <VSpacer />
      </VCardActions>
    </VCard>
</VDialog>
<!--End of Delete Dialog  -->


    </VContainer> 
</template>




<script setup lang="ts">
    import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/components/VForm';

  // Author store
  const authorStore = useAuthorStore()

  const {getAllAuthor, create ,remove} = authorStore;    

  await getAllAuthor(),{ initialCache: false }

  const {author} = storeToRefs(authorStore);



const deleteDialog = ref(false)
let delete_var :any;
const deleteItem = (item:any) => {
 // editedIndex.value = userList.value.indexOf(item)
 // editedItem.value = { ...item }
  deleteDialog.value = true
  delete_var =item;
}

// Method used to remove Author
const removeAuthor = async (item :any) => {
  await authorStore.remove(item._id);
    deleteDialog.value = false;
};



const createDialog = ref(false)
const refDataForm = ref<VForm>()
const dataForm = ref({
  author_name: '',
})

const validateDataForm =  () => {
   refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
       authorStore.create(dataForm.value);
      refDataForm.value?.reset();
    }
    else {  }     
  })
} // End of validatedataForm()


const headers = [
  { title: 'ID', key: 'author_Id' },
  { title: 'AUTHOR NAME', key: 'author_name' },
  { title: 'ACTIONS', key: 'actions' },
]

const search = ref('')

</script>
