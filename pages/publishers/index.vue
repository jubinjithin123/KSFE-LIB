<template>
  <VContainer>

<!-- 👉 Create Dialog  -->
    <VRow>
      <VCol class="text-right">

              <VDialog  v-model="createDialog"  max-width="600"  >
                  <!-- Dialog Activator -->
                  <template #activator="{ props }">
                    <VBtn v-bind="props">
                      Add New Publisher
                    </VBtn>
                  </template>

                <!-- Dialog Content -->
                <VCard title="Publisher">
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
                                  v-model="dataForm.publisher_name"
                                  label="Publisher Name"
                                  placeholder="Enter Publisher Name"
                                  :rules="[requiredValidator,lengthValidator(dataForm.publisher_name,3)]"
                                 
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
    :items="publishers"
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
        <VBtn  color="success"  variant="elevated"  @click="removeCategory(delete_var)" > OK </VBtn>
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

    // Publisher store
    const publisherStore = usePublisherStore()

    const {getAllPublisher, create ,remove} = publisherStore;
     
    // get data on page load       
    await getAllPublisher(),{ initialCache: false }

    const {publishers} = storeToRefs(publisherStore);

  // Method used to remove Publisher
	const removeCategory = async (item :any) => {
		await publisherStore.remove(item._id);
    deleteDialog.value = false;
	};


const deleteDialog = ref(false)

let delete_var :any;
const deleteItem = (item:any) => {
 // editedIndex.value = userList.value.indexOf(item)
 // editedItem.value = { ...item }
  deleteDialog.value = true
  delete_var =item;
}



const createDialog = ref(false)
const refDataForm = ref<VForm>()
const dataForm = ref({
  publisher_name: '',
})

const validateDataForm =  () => {
   refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      let item : IPublisher = {
        publisher_name : dataForm.value.publisher_name ,
        }

      publisherStore.create(item);
      refDataForm.value?.reset();
    }
    else {  }     
  })
} // End of validatedataForm()

const headers = [
  { title: 'ID', key: 'publisher_Id' },
  { title: 'PUBLISHER NAME', key: 'publisher_name' },
  { title: 'ACTIONS', key: 'actions' },
]

const search = ref('')
</script>










