<script setup lang="ts">
import { group } from 'radash'
import NoticeList from '../common/NoticeList.vue'

const MassageData = ref<Entity.Message[]>([
  {
    id: 0,
    type: 0,
    title: 'Admin đã hoàn thành 40% rồi!',
    icon: 'icon-park-outline:tips-one',
    tagTitle: 'Chưa bắt đầu',
    tagType: 'info',
    description: 'Dự án đang tiến triển ổn định, sắp có thể thấy phiên bản chính thức.',
    date: '2022-2-2 12:22',
  },
  {
    id: 1,
    type: 0,
    title: 'Admin đã thêm chức năng thông báo!',
    icon: 'icon-park-outline:comment-one',
    tagTitle: 'Chưa bắt đầu',
    tagType: 'success',
    date: '2022-2-2 12:22',
  },
  {
    id: 2,
    type: 0,
    title: 'Admin đã thêm chức năng định tuyến!',
    icon: 'icon-park-outline:message-emoji',
    tagTitle: 'Chưa bắt đầu',
    tagType: 'warning',
    description: 'Dự án đang tiến triển ổn định...',
    date: '2022-2-5 18:32',
  },
  {
    id: 3,
    type: 0,
    title:
          'Admin đã thêm chức năng điều hướng menu! Admin đã thêm chức năng điều hướng menu! Admin đã thêm chức năng điều hướng menu! Admin đã thêm chức năng điều hướng menu!',
    icon: 'icon-park-outline:tips-one',
    tagTitle: 'Chưa bắt đầu',
    tagType: 'error',
    description:
          'Dự án đang tiến triển ổn định... Dự án đang tiến triển ổn định... Dự án đang tiến triển ổn định... Dự án đang tiến triển ổn định...',
    date: '2022-2-5 18:32',
  },
  {
    id: 4,
    type: 0,
    title: 'Admin đã bắt đầu khởi động!',
    icon: 'icon-park-outline:tips-one',
    tagTitle: 'Chưa bắt đầu',
    description: 'Dự án đang tiến triển ổn định...',
    date: '2022-2-5 18:32',
  },
  {
    id: 5,
    type: 1,
    title: 'Gặp nhau quá muộn??',
    icon: 'icon-park-outline:comment',
    description: 'Dự án đang tiến triển ổn định, sắp có thể thấy phiên bản chính thức.',
    date: '2022-2-2 12:22',
  },
  {
    id: 6,
    type: 1,
    title: 'Định tuyến động đã hoàn thành!',
    icon: 'icon-park-outline:comment',
    description: 'Dự án đang tiến triển ổn định, sắp có thể thấy phiên bản chính thức.',
    date: '2022-2-25 12:22',
  },
  {
    id: 7,
    type: 2,
    title: 'Tiếp theo cần hoàn thiện một số thứ',
    icon: 'icon-park-outline:beach-umbrella',
    tagTitle: 'Chưa bắt đầu',
    description: 'Dự án đang tiến triển ổn định, sắp có thể thấy phiên bản chính thức.',
    date: '2022-2-2 12:22',
  },
])
const currentTab = ref(0)
function handleRead(id: number) {
  const data = MassageData.value.find(i => i.id === id)
  if (data)
    data.isRead = true
  window.$message.success(`id: ${id}`)
}
const massageCount = computed(() => {
  return MassageData.value.filter(i => !i.isRead).length
})
const groupMessage = computed(() => {
  return group(MassageData.value, i => i.type)
})
</script>

<template>
  <NPopover placement="bottom" trigger="click" arrow-point-to-center class="!p-0">
    <template #trigger>
      <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
          <CommonWrapper>
            <NBadge :value="massageCount" :max="99" style="color: unset">
              <IconParkOutlineRemind />
            </NBadge>
          </CommonWrapper>
        </template>
        <span>{{ $t('app.notificationsTips') }}</span>
      </NTooltip>
    </template>
    <NTabs v-model:value="currentTab" type="line" animated justify-content="space-evenly" class="w-390px">
      <NTabPane :name="0">
        <template #default>
          <NSpace class="w-130px" justify="center">
            {{ $t('app.notifications') }}
            <NBadge type="info" :value="groupMessage[0]?.filter(i => !i.isRead).length" :max="99" />
          </NSpace>
          <NoticeList :list="groupMessage[0]" @read="handleRead" />
        </template>
      </NTabPane>
      <NTabPane :name="1">
        <template #default>
          <NSpace class="w-130px" justify="center">
            {{ $t('app.messages') }}
            <NBadge type="warning" :value="groupMessage[1]?.filter(i => !i.isRead).length" :max="99" />
            <NoticeList :list="groupMessage[1]" @read="handleRead" />
          </NSpace>
        </template>
      </NTabPane>
      <NTabPane :name="2">
        <template #default>
          <NSpace class="w-130px" justify="center">
            {{ $t('app.todos') }}
            <NBadge type="error" :value="groupMessage[2]?.filter(i => !i.isRead).length" :max="99" />
          </NSpace>
          <NoticeList :list="groupMessage[2]" @read="handleRead" />
        </template>
      </NTabPane>
    </NTabs>
  </NPopover>
</template>

<style scoped></style>
