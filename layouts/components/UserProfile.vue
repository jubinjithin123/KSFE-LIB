<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { toast } from "vue3-toastify";

const userProfileList = [
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'ri-user-line',
    title: 'Profile',
    value: 'profile',
  },
  { type: 'divider' },

]

toast.success("Login Successfully");
const { data ,signOut } = useAuth();
async function handleLogout() {
  await signOut();
}


</script>


<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      size="38"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="15px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <h6 class="text-sm font-weight-medium">
              Welcome {{ (data?.user as any)?.username }}
            </h6>
            <VListItemSubtitle class="text-capitalize text-disabled">
              Admin
            </VListItemSubtitle>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :value="item.value"
              >
                <template #prepend>
                  <VIcon
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

              </VListItem>

              <VDivider
                v-else
                class="my-1"
              />
            </template>

            <VListItem>
              <VBtn
                block
                color="error"
                append-icon="ri-logout-box-r-line"
                @click="handleLogout"
              >
                Logout
              </VBtn>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
