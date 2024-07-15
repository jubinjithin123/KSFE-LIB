
<template>
  <VContainer>

<!-- 👉 Create Dialog  -->

<VRow>
      <VCol class="text-right">

              <VDialog  v-model="createDialog"  max-width=70% >
                  <!-- Dialog Activator -->
                  <template #activator="{ props }">
                    <VBtn v-bind="props">
                      Add New Book
                    </VBtn>
                  </template>

                <!-- Dialog Content -->
            <VCard title="Book">
                  <DialogCloseBtn
                    variant="text"
                    size="default"
                    @click="createDialog = false"
                  />
              <VCardText>
                <VForm  ref="refDataForm" >
                  <VRow>
                    <!-- 👉 Shelf Name -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VAutocomplete
                      label="Shelf Name"
                      :items="book_shelves.map(x=> x.shelf_name)"
                      v-model="dataForm.shelf_name"
                      placeholder="Select Shelf Name"
                      :rules="[requiredValidator]"
                    />
                    </VCol>

                    <!-- 👉 Section No -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                    <VTextField
                      v-model="dataForm.section_no"
                      label="Section No"
                      placeholder="Enter total no of sections"
                      :rules="[requiredValidator,integerValidator]"                      
                    />
                  </VCol>

                    <!-- 👉 Book Name -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                    <VTextField
                        v-model="dataForm.book_name"
                        label="Book Name"
                        placeholder="Enter Book Name"
                        :rules="[requiredValidator,lengthValidator(dataForm.book_name,3)]"                        
                      />
                    </VCol>

                  <!-- 👉 Category Name -->
                  <VCol
                    cols="12"
                    md="6"
                  >
                  <VAutocomplete
                  label="Category Name"
                  :items="categories.map(x=> x.category_name)"
                  v-model="dataForm.category_name"
                  placeholder="Select Category Name"
                  :rules="[requiredValidator]"
                 />
                  </VCol>

                  <!-- 👉 Author Name -->
                  <VCol
                    cols="12"
                    md="6"
                  >
                  <VAutocomplete
                  label="Author Name"
                  :items="author.map(x=> x.author_name)"
                  v-model="dataForm.author_name"
                  placeholder="Select Author Name"
                  :rules="[requiredValidator]"
                 />
                  </VCol>

                <!-- 👉 Publisher Name -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VAutocomplete
                  label="Publisher Name"
                  :items="publishers.map(x=> x.publisher_name)"
                  v-model="dataForm.publisher_name"
                  placeholder="Select Publisher Name"
                  :rules="[requiredValidator]"
                 />
                </VCol>

                <!-- 👉 ISBN Name -->
                <VCol
                  cols="12"
                  md="6"
                >
                <VTextField
                    v-model="dataForm.ISBN"
                    label="ISBN Number"
                    placeholder="Enter ISBN Number"
                    :rules="[requiredValidator,lengthValidator(dataForm.ISBN,3)]"                        
                  />
                </VCol>

                <!-- 👉 Amount -->
                <VCol
                  cols="12"
                  md="6"
                >
                <VTextField
                    v-model="dataForm.amount"
                    label="Amount"
                    placeholder="Enter Amount"
                    :rules="[requiredValidator]"                        
                  />
                </VCol>

                <!-- 👉 Description -->
                <VCol
                  cols="12"
                >
                <VTextarea
                  v-model="dataForm.description"
                  label="Description"
                  placeholder="Enter Description"
                  auto-grow
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
    :items="books"
    :items-per-page="10"
    :search="search"
    class="text-no-wrap"
  >

        <!-- Status -->
        <template #item.status="{ item }">
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

    // Book store
    const bookStore = useBookStore()
    const {getAllBook, create ,remove} = bookStore;     
    // get data on page load       
    await getAllBook(),{ initialCache: false }
    const {books} = storeToRefs(bookStore);

// Category store
const bookShelfStore = useBookShelfStore()
const {getAllBookShelf,} = bookShelfStore;   
await getAllBookShelf(),{ initialCache: false }
const {book_shelves} = storeToRefs(bookShelfStore);

  // Category store
const categoryStore = useCategoryStore()
const {getAllCategory,} = categoryStore;          
await getAllCategory(),{ initialCache: false }
const {categories} = storeToRefs(categoryStore);

  // Author store
  const authorStore = useAuthorStore()
  const {getAllAuthor,} = authorStore;  
  await getAllAuthor(),{ initialCache: false }
  const {author} = storeToRefs(authorStore);

  // Publisher store
const publisherStore = usePublisherStore()
const {getAllPublisher,} = publisherStore;     
await getAllPublisher(),{ initialCache: false }
const {publishers} = storeToRefs(publisherStore);



  // Method used to remove Book
	const removeCategory = async (item :any) => {
		await bookStore.remove(item._id);
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
  shelf_name: null,
  section_no:null,
  book_name: '',
  category_name: null,
  author_name: null,
  publisher_name: null,
  ISBN: '',
  amount:null,
  no_of_copies:1,
  status: 'Available',
  description: '',
})

const validateDataForm =  () => {
   refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      let item : IBook = {
        shelf_name : String(dataForm.value.shelf_name) ,
        section_no : Number(dataForm.value.section_no) ,
        book_name : dataForm.value.book_name ,
        category_name : String(dataForm.value.category_name) ,
        author_name : String(dataForm.value.author_name),
        publisher_name : String(dataForm.value.publisher_name) ,
        ISBN : dataForm.value.ISBN ,
        amount :Number(dataForm.value.amount) ,
        no_of_copies : Number(dataForm.value.no_of_copies) ,
        status : dataForm.value.status ,
        description : dataForm.value.description ,
        }

      bookStore.create(item);
      refDataForm.value?.reset();
    }
    else {  }     
  })
} // End of validatedataForm()

const headers = [
  { title: 'STOCK NO', key: 'book_Id' },
  { title: 'SHELF NAME', key: 'shelf_name' },
  { title: 'SECTION', key: 'section_no' },
  { title: 'BOOK NAME', key: 'book_name' },
  { title: 'AUTHOR NAME', key: 'author_name' },
  { title: 'CATEGORY NAME', key: 'category_name' },
  { title: 'AVAILABLE COPIES', key: 'no_of_copies' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions' },
]

const search = ref('')


const resolveStatusColor = (status: string) => {
  if (status === 'Available')
    return 'success'
  if (status === 'Completed')
    return 'warning'
  if (status === 'Cancelled')
    return 'error'
}



</script>




