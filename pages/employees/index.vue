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

              <VDialog  v-model="createDialog"  max-width=70% >
                  <!-- Dialog Activator -->
                  <template #activator="{ props }">
                    <VBtn v-bind="props">
                      Add New Employee
                    </VBtn>
                  </template>

                <!-- Dialog Content -->
            <VCard title="Add New Employee">
                  <DialogCloseBtn
                    variant="text"
                    size="default"
                    @click="createDialog = false"
                  />
              <VCardText>
                <VForm  ref="refDataForm" >
                  <VRow>

                    <!-- 👉 Employee Code -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                    <VTextField
                      v-model="dataForm.userName"
                      label="Employee Code"
                      placeholder="Enter Employee Code"
                      :rules="[requiredValidator]"                      
                    />
                  </VCol>

                    <!-- 👉 Employee Name -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                    <VTextField
                        v-model="dataForm.Employee_Name"
                        label="Employee Name"
                        placeholder="Enter Employee Name"
                        :rules="[requiredValidator,lengthValidator(dataForm.Employee_Name,3)]"                        
                      />
                    </VCol>


                <!-- 👉 Branch Code -->
                <VCol
                  cols="12"
                  md="6"
                >
                <VTextField
                    v-model="dataForm.brCode"
                    label="Branch Code"
                    placeholder="Enter Branch Code"
                    :rules="[requiredValidator,integerValidator]"                        
                  />
                </VCol>

                <!-- 👉 Branch Name -->
                <VCol
                  cols="12"
                  md="6"
                >
                <VTextField
                    v-model="dataForm.NAME"
                    label="Branch NAME"
                    placeholder="Enter Branch NAME"
                    :rules="[requiredValidator]"                        
                  />
                </VCol>


                <!-- 👉 DOB -->
                <VCol
                      cols="12"
                      md="6"
                    >
                    <VTextField
                        v-model="dataForm.password"
                        label="Date of Birth"
                        placeholder="Enter Date of Birth Without Special Characters"
                        :rules="[requiredValidator,integerValidator]"                        
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

  <!-- 👉 Data Table  --> 
<VDataTable
    :headers="headers"
    :items="userlogins"
    :items-per-page="10"
    :search="search"
    class="text-no-wrap"
  >


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
    <VDialog
      v-model="editDialog"
      max-width="600"
    >
      <!-- Dialog Content -->
      <VCard title="Edit Employee">
        <DialogCloseBtn
          variant="text"
          size="default"
          @click="editDialog = false"
        />
        <VCardText>
          <VForm ref="refDataForm">
            <VRow>

        <!-- 👉 Employee Code -->
        <VCol
          cols="12"
          md="6"
        >
        <VTextField
          v-model="dataForm.userName"
          label="Employee Code"
          placeholder="Enter Employee Code"
          :rules="[requiredValidator]"                      
        />
        </VCol>

        <!-- 👉 Employee Name -->
        <VCol
          cols="12"
          md="6"
        >
        <VTextField
            v-model="dataForm.Employee_Name"
            label="Employee Name"
            placeholder="Enter Employee Name"
            :rules="[requiredValidator,lengthValidator(dataForm.Employee_Name,3)]"                        
          />
        </VCol>


        <!-- 👉 Branch Code -->
        <VCol
        cols="12"
        md="6"
        >
        <VTextField
        v-model="dataForm.brCode"
        label="Branch Code"
        placeholder="Enter Branch Code"
        :rules="[requiredValidator,integerValidator]"                        
        />
        </VCol>

        <!-- 👉 Branch Name -->
        <VCol
        cols="12"
        md="6"
        >
        <VTextField
        v-model="dataForm.NAME"
        label="Branch NAME"
        placeholder="Enter Branch NAME"
        :rules="[requiredValidator]"                        
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


</template>


<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { VForm } from 'vuetify/components/VForm';

// Employee store
const userLoginStore = useUserLoginStore()
const { getAllEmplolyee, create, remove } = userLoginStore

// get data on page load
await getAllEmplolyee(), { initialCache: false }
const { userlogins } = storeToRefs(userLoginStore)

// Method used to remove Employee
const removeCategory = async (item: any) => {
  await userLoginStore.remove(item._id)
  deleteDialog.value = false
}

//* ***************Start CRUD Dialog********************
const createDialog = ref(false)
const refDataForm = ref<VForm>()

const dataForm = ref(
  {
    userName: "",
    Employee_Name: "",
    password: "",
    brCode: null,
    NAME: "",
    designationCode: 101,
    designationName: "KSFE"
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


const validateDataForm =  () => {
   refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      let item : IUserLogin = {
        userName : String(dataForm.value.userName) ,
        Employee_Name : String(dataForm.value.Employee_Name) ,
        password : dataForm.value.password ,
        brCode : Number(dataForm.value.brCode) ,
        NAME : String(dataForm.value.NAME) ,
        designationCode : Number(dataForm.value.designationCode) ,
        designationName : String(dataForm.value.designationName) ,
        }

       userLoginStore.create(item);
      refDataForm.value?.reset();
    }
    else {  }     
  })
} // End of validatedataForm()


const validateEditDataForm = () => {
  refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      const item: IUserLogin = {
        userName : String(dataForm.value.userName) ,
        Employee_Name : String(dataForm.value.Employee_Name) ,
        password : dataForm.value.password ,
        brCode : Number(dataForm.value.brCode) ,
        NAME : String(dataForm.value.NAME) ,
        designationCode : Number(dataForm.value.designationCode) ,
        designationName : String(dataForm.value.designationName) ,
      }

      userLoginStore.update(edit_var._id, item)
    }
    else { }
  })
} // End of validateEditDataForm()

const headers = [
  { title: 'EMPLOYEE CODE', key: 'userName' },
  { title: 'EMPLOYEE NAME', key: 'Employee_Name' },
  { title: 'BRANCH CODE', key: 'brCode' },
  { title: 'BRANCH NAME', key: 'NAME' },
  { title: 'ACTIONS', key: 'actions' },
]

const search = ref('')

const branchCode = [101, 102,103,50]

</script>
