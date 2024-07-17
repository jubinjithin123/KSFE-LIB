<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VForm } from 'vuetify/components/VForm'

// Category store
const bookShelfStore = useBookShelfStore()

const { getAllBookShelf, create, remove } = bookShelfStore

// get data on page load
await getAllBookShelf(), { initialCache: false }

const { book_shelves } = storeToRefs(bookShelfStore)

// Method used to remove Category
const removeCategory = async (item: any) => {
  await bookShelfStore.remove(item._id)
  deleteDialog.value = false
}

//* ***************Start CRUD Dialog********************
const createDialog = ref(false)
const refDataForm = ref<VForm>()

const dataForm = ref(
  {
    shelf_name: '',
    no_of_sections: null,
  },
)

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

const validateCreateDataForm = () => {
  refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      const item: IBookShelf = {
        shelf_name: dataForm.value.shelf_name,
        no_of_sections: Number(dataForm.value.no_of_sections),
      }

      bookShelfStore.create(item)
      refDataForm.value?.reset()
    }
    else { }
  })
} // End of validateCreateDataForm()

const validateEditDataForm = () => {
  refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      const item: IBookShelf = {
        shelf_name: dataForm.value.shelf_name,
        no_of_sections: Number(dataForm.value.no_of_sections),
      }

      bookShelfStore.update(edit_var._id, item)
    }
    else { }
  })
} // End of validateEditDataForm()

const headers = [
  { title: 'ID', key: 'book_shelf_Id' },
  { title: 'SHELF NAME', key: 'shelf_name' },
  { title: 'NO OF SECTIONS', key: 'no_of_sections' },
  { title: 'ACTIONS', key: 'actions' },
]

const search = ref('')
</script>

<template>
  <VContainer>
    <!-- 👉 Create Dialog  -->
    <VRow>
      <VCardText>
        <VTextField
          v-model="search"
          label="Search"
          placeholder="Search ..."
          append-inner-icon="ri-search-line"
          single-line
          hide-details
          dense
          outlined
          variant="outlined"
        />
      </VCardText>

      <VCol class="text-right">
        <VDialog
          v-model="createDialog"
          max-width="600"
        >
          <!-- Dialog Activator -->
          <template #activator="{ props }">
            <VBtn v-bind="props">
              Add New Book Shelf
            </VBtn>
          </template>

          <!-- Dialog Content -->
          <VCard title="Add Book Shelf">
            <DialogCloseBtn
              variant="text"
              size="default"
              @click="createDialog = false"
            />
            <VCardText>
              <VForm ref="refDataForm">
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="dataForm.shelf_name"
                      label="Shelf Name"
                      placeholder="Enter Shelf Name"
                      :rules="[requiredValidator, lengthValidator(dataForm.shelf_name, 3)]"
                    />
                  </VCol>

                  <VCol cols="12">
                    <VTextField
                      v-model="dataForm.no_of_sections"
                      label="No of Sections"
                      placeholder="Enter total no of sections"
                      :rules="[requiredValidator, integerValidator]"
                    />
                  </VCol>

                  <VCol
                    offset-md="3"
                    cols="12"
                    md="9"
                    class="d-flex gap-4"
                  >
                    <VSpacer />
                    <VBtn
                      color="success"
                      @click="validateCreateDataForm"
                    >
                      Save
                    </VBtn>
                    <VBtn
                      color="error"
                      @click="createDialog = false"
                    >
                      Close
                    </VBtn>
                    <VBtn
                      color="secondary"
                      type="reset"
                    >
                      Reset
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
        </VDialog>
      </VCol>
    </VRow>
    <!-- End of Dialog  -->

    <!-- 👉 Data Table  -->

    <VDataTable
      :headers="headers"
      :items="book_shelves"
      :items-per-page="10"
      :search="search"
      class="text-no-wrap"
    >
      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn
            color="warning"
            size="small"
          >
            <VIcon
              icon="ri-pencil-line"
              @click="editItem(item)"
            />
          </IconBtn>
          <IconBtn
            color="error"
            size="small"
            @click="deleteItem(item)"
          >
            <VIcon icon="ri-delete-bin-line" />
          </IconBtn>
        </div>
      </template>
    </VDataTable>

    <!-- End of Data Table  -->

    <!-- 👉 Delete Dialog  -->
    <VDialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <VCard>
        <VCardTitle>
          Are you sure you want to delete this item?
        </VCardTitle>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="success"
            variant="elevated"
            @click="removeCategory(delete_var)"
          >
            OK
          </VBtn>
          <VBtn
            color="error"
            variant="outlined"
            @click="deleteDialog = false"
          >
            Cancel
          </VBtn>
          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
    <!-- End of Delete Dialog  -->

    <!-- 👉 Edit Dialog  -->
    <VDialog
      v-model="editDialog"
      max-width="600"
    >
      <!-- Dialog Content -->
      <VCard title="Edit Book Shelf">
        <DialogCloseBtn
          variant="text"
          size="default"
          @click="editDialog = false"
        />
        <VCardText>
          <VForm ref="refDataForm">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="dataForm.shelf_name"
                  label="Shelf Name"
                  placeholder="Enter Shelf Name"
                  :rules="[requiredValidator, lengthValidator(dataForm.shelf_name, 3)]"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="dataForm.no_of_sections"
                  label="No of Sections"
                  placeholder="Enter total no of sections"
                  :rules="[requiredValidator, integerValidator]"
                />
              </VCol>

              <VCol
                offset-md="3"
                cols="12"
                md="9"
                class="d-flex gap-4"
              >
                <VSpacer />
                <VBtn
                  color="success"
                  @click="validateEditDataForm"
                >
                  Update
                </VBtn>
                <VBtn
                  color="error"
                  @click="editDialog = false"
                >
                  Close
                </VBtn>
                <VBtn
                  color="secondary"
                  type="reset"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>
    <!-- End of Edit Dialog  -->
  </VContainer>
</template>
