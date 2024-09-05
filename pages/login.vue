<script setup lang="ts">

import { themeConfig } from '@themeConfig';

import type { NuxtError } from 'nuxt/app';
import { toast } from "vue3-toastify";

import tree1 from '@images/misc/tree1.png';
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png';
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png';
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png';
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png';
import authV2MaskDark from '@images/pages/mask-v2-dark.png';
import authV2MaskLight from '@images/pages/mask-v2-light.png';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';


import { VForm } from 'vuetify/components/VForm';
const route = useRoute()


const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const errors = ref<Record<string, string | undefined>>({
  username: undefined,
  password: undefined,
})

const refDataForm = ref<VForm>()
const form = ref({
  username: '',
  password: '',
})

const isPasswordVisible = ref(false)


 definePageMeta({
  layout: 'blank',
  middleware: "guest",
});
 

const { signIn, data: sessionData } = useAuth()

async function handleLogin() {
    const response = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      ...form.value,
    })

      // If error is not null => Error is occurred
  if (response && response.error) {
   // console.log("response : ",response)
    toast.error("Invalid Username or password");
    const apiStringifiedError = response.error
    const apiError: NuxtError = JSON.parse(apiStringifiedError)
    errors.value = apiError.data
    // If err => Don't execute further
    return
  }//End of if


    // Reset error on successful login
    errors.value = {}
  // Update user abilities
  const { user } = sessionData.value!

  console.log("sessionData.value! : ",user)
    navigateTo(route.query.to ? String(route.query.to) : '/', { replace: true })

}


const validateDataForm =  () => {
  refDataForm.value?.validate().then(valid => {
    if (valid.valid) {
      handleLogin()
    }
    else {  }     
  })
} // End of validatedataForm()


</script>

<template>
  <div class="auth-logo d-flex align-center gap-x-3">
    <VNodeRenderer :nodes="themeConfig.app.logo" />

    <h1 class="auth-title">
      {{ themeConfig.app.title }}
    </h1>
  </div>

  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="8"
      class="d-none d-md-flex position-relative"
    >
      <div class="d-flex align-center justify-end w-100 h-100 pa-10 pe-0">
        <VImg
          max-width="797"
          :src="authThemeImg"
          class="auth-illustration"
        />
      </div>

      <img
        class="auth-footer-mask"
        height="360"
        :src="authThemeMask"
      >

      <VImg
        :src="tree1"
        alt="tree image"
        height="190"
        width="90"
        class="auth-footer-tree"
      />
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h4 class="text-h4 mb-1">
            Welcome to {{ themeConfig.app.title }} ! 👋🏻
          </h4>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>
        <VCardText>
          <VForm ref="refDataForm" @submit.prevent="validateDataForm" >
            <VRow>
              <!-- username -->
              <VCol cols="12">
                <VTextField
                  v-model="form.username"
                  autofocus
                  label="User Name"
                  type="text"
                  :rules="[requiredValidator]"
                  :error-messages="errors.username"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  :rules="[requiredValidator]"
                  :error-messages="errors.password"
                />

                <div class="d-flex align-center flex-wrap justify-space-between my-5 gap-4">


                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
